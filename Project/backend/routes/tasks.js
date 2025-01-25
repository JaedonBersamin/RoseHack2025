const express = require('express')
const Task = require('../models/TaskModel');
const router = express.Router()

router.get('/', function (req, res) {
    res.json({mssg: 'GET ALL TASKS'});
});

router.post('/', async (req, res) => {
    const {name, xp} = req.body;

    try {
        const task = await Task.create({name, xp});
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;