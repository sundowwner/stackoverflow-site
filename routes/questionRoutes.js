"use strict";
var express = require("express");
var jwt = require("express-jwt");
var mongoose = require("mongoose");
var router = express.Router();
var Question = mongoose.model("Question");
var User = mongoose.model("User");
var auth = jwt({
    userProperty: "payload",
    secret: "SecretKey"
});
router.get("/", function (req, res, next) {
    Question.find({})
        .exec(function (err, questions) {
        if (err)
            return next(err);
        res.json(questions);
    });
});
router.get("/:id", function (req, res, next) {
    Question.findOne({ _id: req.params.id })
        .populate("createdBy", "username email")
        .exec(function (err, question) {
        if (err)
            return next(err);
        if (!question)
            return next({ message: "Could not find your question." });
        res.send(question);
    });
});
router.post("/", auth, function (req, res, next) {
    var newQuestion = new Question(req.body);
    newQuestion.createdBy = req["payload"]._id;
    newQuestion.save(function (err, question) {
        if (err)
            return next(err);
        User.update({ _id: req["payload"]._id }, { $push: { "questions": question._id } }, function (err, result) {
            if (err)
                return next(err);
            res.send(question);
        });
    });
});
router.put("/:_id", function (req, res, next) {
    Question.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: "Could not find and update your question." });
        res.send(result);
    });
});
router.delete("/", function (req, res, next) {
    if (!req.query._id)
        return next({ status: 404, message: "Please include an ID " });
    Question.remove({ _id: req.query._id }, function (err, result) {
        res.send({ message: "SUCCESSSSS!YAAAY" });
    });
});
module.exports = router;
