const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    userId:{type: mongoose.Types.ObjectId, ref: 'User'},
    title:{type: String, required: true},
    desc:{type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Todo', todoSchema)