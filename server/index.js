require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoute = require('./routes/userRoute')
const todoRoute = require('./routes/todoRoute')

const app = express()
connectDB()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoute)
app.use('/todo', todoRoute)

const PORT = process.env.PORT ||5000

app.listen(PORT, console.log(`Server connected to port ${PORT}`))