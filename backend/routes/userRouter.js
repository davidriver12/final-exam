const express = require('express');
const User = require('../models/user')

const router = express.Router();

router.get("/", (req, res) => {
    User.find({}, "full_name")
        .exec(function (err, list_users){
            if (err) throw err;
            console.log(list_users);
            res.json(list_users)
        })
})

router.post('/:id/sendfr', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $push: { friend_requests: req.user.full_name } }, function(err, docs){
        if (err){
            throw(err)
        }
        else{
            console.log("Updated User : ", docs);
        }
    })
})

router.post('/:name/accept', (req, res) => {
    User.findByIdAndUpdate( req.user.id , { $push: { friend_list: req.params.name}, $pull: { friend_requests: req.params.name } } , function(err, docs){
        if (err){
            throw(err)
        }
        else{
            console.log("Updated User : ", docs);
        }
    })
})

router.post('/:name/decline', (req, res) => {
    User.findByIdAndUpdate(req.user.id, { $pull: { friend_requests: req.params.name }}, function(err, docs){
        if (err){
            throw(err)
        } else {
            console.log("Updated User : ", docs);
        }
    })
})

module.exports = router;