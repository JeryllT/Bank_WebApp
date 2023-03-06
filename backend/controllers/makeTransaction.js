const makeTransactionRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const BankAccounts = require('../models/BankAccounts');
const ScheduledTrans = require('../models/ScheduledTrans');

makeTransactionRouter.post('/', async (request, response) => {

    const {transferAmt, senderAccId, recipientAccId, comment} = request.body;
    console.log(transferAmt, senderAccId, recipientAccId, comment)

    const token = request.token;
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.userId) {
        return response.status(401).json({error: 'token missing or invalid'});
    }
    
    const recipientAcc = await BankAccounts.findOne({AccountID: recipientAccId});

    // Check if recipient account alone can determine == null (without id)
    if (recipientAcc == null) {
        return response.status(400).json({error: 'recipient account does not exist'});
    } else if (recipientAcc.AccountID === senderAccId) {
        return response.status(400).json({error: 'cannot transfer to same account'});
    }

    const receipientAccBal = recipientAcc.AcccountBalance;

    const senderAcc = await BankAccounts.findOne({AccountID: senderAccId});
    const senderAccBal = senderAcc.AcccountBalance;

    if (senderAccBal < transferAmt) {
        return response.status(400).json({error: 'insufficient funds'});
    }

    const newSenderAccBal = senderAccBal - transferAmt;
    const newRecipientAccBal = receipientAccBal + transferAmt;

    await BankAccounts.updateOne({AccountID: senderAccId}, {AcccountBalance: newSenderAccBal});
    await BankAccounts.updateOne({AccountID: recipientAccId}, {AcccountBalance: newRecipientAccBal});

    const allTrans = await ScheduledTrans.find({});
    const curTransId = allTrans.length + 1;

    const newTrans = new ScheduledTrans({
        TransactionID: curTransId,
        AccountID: senderAccId,
        ReceivingAccountID: recipientAccId,
        Date: new Date().toISOString(),
        TransactionAmount: transferAmt,
        Comment: comment,
        Sender: senderAcc._id,
        Recipient: recipientAcc._id
    });

    await newTrans.save();

    response.status(200).json({message: 'transaction successful'});
})

module.exports = makeTransactionRouter;