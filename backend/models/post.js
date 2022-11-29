const mongoose = require("mongoose");
const post = new mongoose.Schema({
    content: String,
    timestamp: Date,
    author_id: String,
    author_name: String,
    reactions: Object,
    comments: Array,
});

module.exports = mongoose.model("Post", post);