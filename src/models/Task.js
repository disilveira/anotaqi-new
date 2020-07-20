const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    tarefa: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    user: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);