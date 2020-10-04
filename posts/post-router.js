const express = require("express")
const db = require("../data/db")
const data = require("../data/db")
const router = express.Router()

router.get('/api/posts', (req,res)=>{
    data.find({sortBy: req.query.sortBy})
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(er => {
        console.log(er);
        res.status(500).json({ error: "The posts information could not be retrieved."})
    })
})

router.get('/api/posts/:id', (req, res)=>{
    db.findById(req.params.id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(er => {
        console.log(er);
        res.status(404).json({message: 'post ot found'})
    })
    
})

router.get('/api/posts/:id/comments', (req,res)=>{
    const id = req.params.id;
    data.findPostComments(id)
    .then(com => {
        res.status(200).json(com);
    })
    .catch(er => {
        console.log(er);
        res.status(404).json({message: 'comments not found'})
    })
})

router.post('/api/posts', (req,res)=>{
    if (req.body.title || req.body.contents){
        db.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(er => {
            console.log(er);
            res.status(500).json({message: 'server error'})
        });
    } else {
        res.status(400).json({message: 'please provide title and contents for the post'})
    }
})

router.post('/api/posts/:id/comments', (req,res)=>{
    const id = req.params.id;
    const post = data.findById(id);
    const comment = req.body;
    if (!post){
        res.status(404).json({message: "The post with the specified ID does not exist."})
    }
    if (comment.text){
        db.insertComment(req.body)
        .then(com => { 
            res.status(201).json(comment)
        })
        .catch(er => {
            console.log(er);
            res.status(500).json({errorMessage: "server error"})
        })
    } else {
        res.status(400).json({message: "Please provide text for the comment."})
    }
    })

router.delete('/api/posts/:id',(req,res)=>{
    const id = req.params.id;
    const post = data.findById(id);
    if (!post) {
        return res.status(404).json({message: 'user id not found'});
    } 
    data.remove(id)
    res.status(200);
})

router.put('/api/posts/:id',(req,res)=>{
    const id = req.params.id;
    const post = data.findById(id);
    if (!post) {
        return res.status(404).json({message: 'user id not found'});
    } 
    db.update(id,req.body)
    .then(response => {
        res.status(200).json(req.body);
    })
    .catch(er => {
        console.log(er);
        res.status(500);
    })
})

module.exports = router;