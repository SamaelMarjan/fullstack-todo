const { createUser, loginUser, forgotController, getUser, updateUser } = require('../controllers/userController')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

//create user route
router.post('/register', createUser)

//login user route
router.post('/login', loginUser)

//forgot password route
router.post('/reset', forgotController)

//user route
router.get('/user', verifyToken, getUser)

//update user
router.put('/update', verifyToken, updateUser)

module.exports = router