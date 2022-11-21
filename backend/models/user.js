const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    full_name: String,
    friend_requests: Array,
    friend_list: Array,
    profile_picture: Object,
    profile_info: String,
});

module.exports = mongoose.model("User", user);