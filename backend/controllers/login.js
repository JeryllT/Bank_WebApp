require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body 
    const user = await User.findOne({Username: username})

    console.log(user)
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.Password)
    
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.Username,
        userId: user.UserID,
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET)
    response
        .status(200)
        .send({token, username: user.Username, name: user.Firstname, userId: user.UserID})
})

module.exports = loginRouter