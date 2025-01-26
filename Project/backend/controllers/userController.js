const User = require('../models/userModel');
const mongoose = require('mongoose');

const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1});

    res.status(200).json(users);
}

const getUser = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `No user found with id ${id}`});
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({error: `No user found with id ${id}`})
    }

    res.status(200).json(user);
}

const createUser = async (req, res) => {
    const {username, password, email, streak, tasks, level} = req.body;

    try {
        const user = await User.create({username, password, email, streak, tasks, level});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `No user found with id ${id}`});
    }

    const user = await User.findOneAndDelete({_id: id});

    if (!user) {
        return res.status(400).json({error: `No user found with id ${id}`});
    }

    res.status(200).json(user);
}

const updateUser = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: `No user found with id ${id}`});
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!user) {
        return res.status(400).json({error: `No user found with id ${id}`});
    }

    res.status(200).json(user);
}

const getUsersByStreak = async (req, res) => {
    const users = await User.find({}).sort({streak: -1});
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}