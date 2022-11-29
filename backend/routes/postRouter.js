const express = require('express');
const Post = require('../models/post')

const router = express.Router();

router.post('/new', (req, res) => {
    const post = new Post({
        content: req.body.content,
        timestamp: new Date(),
        author_id: req.user.id,
        author_name: req.user.full_name,
        reactions: {gusta: 0, encanta: 0, divierte: 0, asombra: 0, entristece: 0, enoja: 0},
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

router.post('/:id/comment', (req,res) => {
    const comment = {
        content: req.body.content,
        author_name: req.user.full_name,
        author_id: req.user.id,
        timestamp : new Date(),
    }
    console.log('xd')
    Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment } }, function(err, docs){
        if (err){
            throw(err)
        } else {
            console.log("Updated Post: ", docs);
        }
    })
})

router.post('/:id/:reaction', (req, res) => {
    let field = "reactions." + req.params.reaction;
    Post.findByIdAndUpdate(req.params.id, { $inc: { [field]: 1 } }, function(err, docs){
        if (err){
            throw(err)
        } else {
            console.log("Updated Post : ", docs);
        }
    })
})

router.get('/by/:id', (req, res) => {
    Post.find({ author_id: req.params.id })
        .exec(function(err, docs){
            if (err) throw err;
            res.json(docs);
        })
})

module.exports = router;