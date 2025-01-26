const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { taskSchema} = require('./taskModel');

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    streak: { type: Number, required: true },
    tasks: {type: [taskSchema], default: []},
    level: {type: Number, required: true},
    xp_points: {type: Number, required: true},
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);

