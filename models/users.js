"use strict";
var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, lowercase: true },
    email: { type: String, unique: true, lowercase: true },
    passwordHash: String,
    salt: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
});
UserSchema.method("setPassword", function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
});
UserSchema.method("validatePassword", function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
    return (hash === this.passwordHash);
});
UserSchema.method("generateJWT", function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    }, "SecretKey");
});
exports.User = mongoose.model("User", UserSchema);
