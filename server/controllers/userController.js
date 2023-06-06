const { hashPass, comparePass } = require('../helpers/authHelper')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

//create user
module.exports.createUser = async(req, res) => {
    try {
        const {username, email, password} = req.body

        //validations
        if(!username) return res.json({message: "Username required"})
        if(!email) return res.json({message: "Email required"})
        if(!password) return res.json({message: "Password required"})

        //check existing user
        const existing = await userModel.findOne({email})
        if(existing) return res.json({message: "User already registered"})

        //hash password
        const hash = await hashPass(password)

        //create user
        const user = await userModel({...req.body, password: hash}).save()
        res.status(200).json({
            success: true, message: "Registered successfully", user
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Error on register'
        })
    }
}

//login user
module.exports.loginUser = async(req, res) => {
    try {
        const {email, password} = req.body

        //validations
        if(!email || !password) return res.json({message: "Email or password missing"})

        //check user
        const user = await userModel.findOne({email})
        if(!user) return res.json({message: 'User not registered'})

        //compare password
        const compare = await comparePass(password, user.password)
        if(!compare) return res.json({message: 'Password not matched'})

        //create json token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

        //remove password
        user.password = undefined
        
        //login user
        res.status(200).json({
            success: true, message: "Login successfull", user, token
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Error on login'
        })
    }
}

//forgot password controller
module.exports.forgotController = async(req, res) => {
    try {
        const {email, newPass} = req.body

        //validations
        if(!email || !newPass) return res.json({message: 'Email password required'})

        //check user
        const user = await userModel.findOne({email})
        if(!user) return res.json({message: 'Invalid email'})

        //hash password
        const hash = await hashPass(newPass)

        await userModel.findByIdAndUpdate(user._id, {password: hash})

        res.status(200).json({
            success: true, message: 'Password reset successfull'
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Error on reset password'
        })
    }
}

//get user
module.exports.getUser = async(req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password')
        res.status(200).json({
            success: true, message: "User", user
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Error on get user'
        })
    }
}

//update user
module.exports.updateUser = async(req, res) => {
    try {
        const {password} = req.body
        const hash = await hashPass(password)
        const user = await userModel.findByIdAndUpdate(req.user.id,{...req.body, password: hash}, {new: true}).select('-password')
        res.status(200).json({
            success: true, message: "User updated", user
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Error on update user'
        })
    }
}