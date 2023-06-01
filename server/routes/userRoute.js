const { createUser, loginUser } = require('../controllers/userController')

const router = require('express').Router()

//create user route
router.post('/register', createUser)

//login user route
router.post('/login', loginUser)

module.exports = router