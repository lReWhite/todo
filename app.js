const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const authRoutes =require('./routes/auth')

const keys = require('./Config/keys')
const app = express()


mongoose.connect(keys.mongoURI)
    .then(()=> console.log('MongoDB connected'))
    .catch(error => console.log(error))



app.use (passport.initialize())
app.use ('/uploads', express.static('uploads'))
require('./middleware/passport')(passport)
app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/auth', authRoutes)





module.exports = app
