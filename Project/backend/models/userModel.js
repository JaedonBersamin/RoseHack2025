const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { taskSchema} = require('./taskModel');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    streak: { type: Number, required: true },
    tasks: {type: [taskSchema], default: []},
    level: {type: number, required: true},
}, {timestamps: true});

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);

