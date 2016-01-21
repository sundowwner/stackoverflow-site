"use strict";

import mongoose = require("mongoose");
let QuestionSchema = new mongoose.Schema({

    topic: {  type: String, required: true },
    ask: { type: String, required: true },
    tag: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    // created: { type: Number, default: Date.now }

});

export let Question = mongoose.model("Question",QuestionSchema);
