"use strict";

import express = require("express");
import jwt = require("express-jwt");
let mongoose = require("mongoose");
let router = express.Router();
let Question = mongoose.model("Question");
let User = mongoose.model("User");
let auth = jwt({

    userProperty: "payload",

    secret: "SecretKey"
});

router.get("/", (req,res,next) => {
    Question.find({})
    .exec((err, questions) => {
        if (err) return next (err);
        res.json(questions);
    });
});

router.get("/:id", (req,res,next) => {
    Question.findOne({_id: req.params.id })
    .populate("createdBy", "username email")
    .exec((err, question) => {
        if (err) return next(err);
        if (!question) return next ({ message: "Could not find your question."});
        res.send(question);
    });
});

router.post("/", auth, (req,res,next) => {
    let newQuestion = new Question(req.body);
    newQuestion.createdBy = req["payload"]._id;
    newQuestion.save((err, question) => {
        if (err) return next(err);
        User.update({_id: req["payload"]._id },{ $push: { "questions": question._id } },(err, result) => {
            if (err) return next(err);
            res.send(question);
        });
    });
});

router.put("/:_id", (req,res, next) => {
    Question.findOneAndUpdate({_id: req.params._id }, req.body, { new: true }, (err, result) => {
        if (err) return next(err);
        if (!result) return next({ message: "Could not find and update your question."});
        res.send(result);
    });
});

router.delete("/", (req,res,next) => {
    if(!req.query._id) return next({ status: 404, message: "Please include an ID "});
    Question.remove({ _id: req.query._id }, (err, result) => {
        res.send({ message: "SUCCESSSSS!YAAAY"});
    });
});

export = router;
