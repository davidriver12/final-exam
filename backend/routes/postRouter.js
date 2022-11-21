const express = require('express');
const Post = require('../models/post')

const router = express.Router();

router.post('/new', (req, res) => {
    const post = new Post({
        content: req.body.content,
        timestamp: new Date(),
        author: req.user.full_name,
        reactions: {gusta: 0, encanta: 0, importa: 0, divierte: 0, asombra: 0, entristece: 0, enoja: 0},
        comments: [],
    }).save((err) => {
        if (err) throw err;
    })
})

router.get('/', (req, res) => {
    Post.find({})
        .exec(function (err, list_posts){
            if (err) throw err;
            console.log(list_posts);
            res.json(list_posts)
        })
})

module.exports = router;