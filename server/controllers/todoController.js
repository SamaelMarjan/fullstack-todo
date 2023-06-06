const moment = require('moment/moment')
const todoModel = require('../models/todo')

//create todo controller
module.exports.createTodo = async(req, res) => {
    try {
        const {title, desc} = req.body

        //validations
        if(!title) return res.json({message: 'Title required'})
        if(!desc) return res.json({message: 'Description required'})

        //create
        const todo = await todoModel({title, desc, userId: req.user.id }).save()

        res.status(200).json({
            success: true, message: 'Todo created successfully', todo
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Error while creating todo'
        })
    }
}

//get all todo
module.exports.getAllTodo = async(req, res) => {
    try {
        const todo = await todoModel.find().populate('userId', '-password')
        res.status(200).json({
            success: true, message: 'All todos', todo
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Error while getting all todo'
        })
    }
}

//get my todo

//get single todo
module.exports.getSingleTodo = async(req, res) => {
    try {
        const {id} = req.params
        const todo = await todoModel.findById(id).populate('userId', '-password')
        res.status(200).json({
            success: true, message: 'Todo by id', todo
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Error while getting all todo'
        })
    }
}

//update todo
module.exports.updateTodo = async(req, res) => {
    try {
        const {id} = req.params
        const {title, desc} = req.body
        const todo = await todoModel.findByIdAndUpdate(id, {title, desc}, {new: true})
        res.status(200).json({
            success: true, message: 'Todo updated successfully', todo
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Error while updating todo'
        })
    }
}

//delete todo
module.exports.deleteTodo = async(req, res) => {
    try {
        const {id} = req.params
        await todoModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true, message: 'Successfully deleted'
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Error while delete todo'
        })
    }
}