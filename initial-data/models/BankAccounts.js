const mongoose = require('mongoose')

const bankAccountSchema = new mongoose.Schema({
        AccountID: Number,
        UserID: Number,
        AccountType: String,
        AcccountBalance: Number,
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    })

module.exports = mongoose.model('BankAccount', bankAccountSchema)