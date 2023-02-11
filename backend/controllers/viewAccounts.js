const accountsRouter = require('express').Router()
const User = require('../models/User')
const Accounts = require('../models/BankAccounts')
const jwt = require('jsonwebtoken')

accountsRouter.get('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.userId) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const userId = decodedToken.userId
    const accounts = await Accounts.find({UserID: userId})
    response.json(accounts)
})

module.exports = accountsRouter