const { createTodo, getAllTodo, getSingleTodo, updateTodo, deleteTodo, myTodo } = require('../controllers/todoController')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

//create todo route
router.post('/create', verifyToken, createTodo)

//get all todo route
router.get('/get', getAllTodo)

//my todo route
router.get('/mytodo', verifyToken, myTodo)

//get single todo
router.get('/get/:id', getSingleTodo)

//update todo
router.put('/update/:id', verifyToken, updateTodo)

//delete todo
router.delete('/delete/:id', verifyToken, deleteTodo)

module.exports = router