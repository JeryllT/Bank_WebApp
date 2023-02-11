const mongoose = require('mongoose')

const ScheduledTransactionSchema = new mongoose.Schema({
    TransactionID: Number,
    AccountID: Number,
    ReceivingAccountID: Number,
    Date: Date,
    TransactionAmount: Number,
    Comment: String,
    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount'
    },
    Recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount'
    }
})

module.exports = mongoose.model('ScheduledTransaction', ScheduledTransactionSchema)