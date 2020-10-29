const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const uuid = require('uuid');   

const blogs = require('../../models/blogs');
 
// Gets all blogs
router.get('/', async (req, res) => {
    const getblogs = await blogs.find({});
    res.json(getblogs);
});

// gets single blog
router.get('/:id', async (req, res) => {
    const getblog = await blogs.findById(req.params.id);
    res.json(getblog);
});

// create blog
router.post('/', async (req,res) => {
    const payload = req.body;
    const newblog = new blogs(payload);
    await newblog.save();
    res.status(201).end();
});

// update blog
router.put('/:id', async (req, res) => {
    const payload = req.body;
    await blogs.findByIdAndUpdate(req.params.id, { $set: payload });
    const upDBlog = await blogs.findById(req.params.id);
    res.json( 
        {
            msg : "blog updated!",
            Blog : upDBlog
        }
    )
});

//delete blog
router.delete('/:id', async (req, res) =>
    {
        await blogs.findByIdAndDelete(req.params.id);
        res.status(204).end();
    }
)

//delete all blogs
router.delete('/delall', async (req,res) =>
    {
        await blogs.remove({});
        res.status(204).end();
    }
)

module.exports = router;