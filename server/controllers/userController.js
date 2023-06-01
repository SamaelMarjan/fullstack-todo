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