"use strict";
var mongoose = require("mongoose");
var QuestionSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    ask: { type: String, required: true },
    tag: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
exports.Question = mongoose.model("Question", QuestionSchema);
