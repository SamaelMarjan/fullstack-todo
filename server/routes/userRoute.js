const { createUser, loginUser, forgotController } = require('../controllers/userController')

const router = require('express').Router()

//create user route
router.post('/register', createUser)

//login user route
router.post('/login', loginUser)

//forgot password route
router.post('/reset', forgotController)

module.exports = router