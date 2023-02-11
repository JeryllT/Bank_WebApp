const transactionRouter = require('express').Router()
const transactions = require('../models/ScheduledTrans')
const bankAccounts = require('../models/BankAccounts')
const jwt = require('jsonwebtoken')

transactionRouter.get('/:accoundId', async (request, response) => {
    const token = request.token
    const accountId = request.params.accoundId
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.userId) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const sentTrans = await transactions.find({AccountID: accountId})
        .populate({
            path: 'Recipient',
            select: 'AccountID User',
            populate: {
                path: 'User',
                select: 'Firstname Lastname'
            }
        })
    
    const receivedTrans = await transactions.find({ReceivingAccountID: accountId})
        .populate({
            path: 'Sender',
            select: 'AccountID User',
            populate: {
                path: 'User',
                select: 'Firstname Lastname'
            }
        })

    const allTrans = {sent: sentTrans, received: receivedTrans}

    response.json(allTrans)
})

module.exports = transactionRouter
