const mongoose = require("mongoose");
const post = new mongoose.Schema({
    content: String,
    timestamp: Date,
    author: String,
    reactions: Object,
    comments: Array,
});

module.exports = mongoose.model("Post", post);