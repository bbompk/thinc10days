const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const uuid = require('uuid');

const members = require('../../models/members');

// Gets all members
router.get('/', async (req, res) => {
    const getmembers = await members.find({});
    res.json(getmembers);
});

// gets single member by object id
router.get('/:id', async (req, res) => {
    const getmember = await members.findById( req.params.id );
    res.json(getmember)
});

// register member
router.post('/register', async (req,res) => {
    const payload = req.body;
    if(!payload.name || !payload.email || !payload.password) {
        res.status(400).json({ msg : 'Please fill all fields'});
    }

    const passwordHash = bcrypt.hashSync(payload.password, 5); 
    payload.password = passwordHash;
    const newMember = new members(payload);
    await newMember.save();

    
    res.status(201).end();
});

// member login
router.post('/login', async (req,res) => {
    const payload = req.body;
    if(!payload.email || !payload.password) {
        res.status(400).json({ msg : 'Please fill all fields'});
    }

    const member = await members.findOne({ email : payload.email });
    if(member){
        const isCorrect = bcrypt.compareSync(payload.password, member.password);
        if(isCorrect){
            res.json({ msg : "logged in successful!"});
        }
    }
});

//update member
router.put('/:id',  async (req, res) => {
    const payload = req.body;
    await members.findByIdAndUpdate(req.params.id, { $set: payload});
    upDMember = await members.findById(req.params.id);
    res.json( 
        {
            msg : "member updated!",
            member : upDMember
        }
    )
});

//delete member
router.delete('/:id', async (req, res) => 
    {
        await members.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } 
)

//delete all member
router.delete('/delall', async (req,res) =>
    {
        await members.remove({});
        res.status(204).end();
    }
)

module.exports = router;