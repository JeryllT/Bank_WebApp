require("dotenv").config()
// File parser
const fs = require('fs')

const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// Schemas to use for importing data
const User = require("./models/User")
const BankAccount = require("./models/BankAccounts")
const ScheduledTransaction = require("./models/ScheduledTrans")

app.use(cors())
app.use(express.json())
app.use(express.static("build"))

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(() => console.log("connected to MongoDB"))
    .catch((error) => console.log("error connecting to MongoDB:", error.message))

const userData = JSON.parse(fs.readFileSync("./dataset/User.json"), 'utf8')
const bankAccountData = JSON.parse(fs.readFileSync("./dataset/BankAccount.json"), 'utf8')
const scheduledTransactionData = JSON.parse(fs.readFileSync("./dataset/ScheduledTransactions.json"), 'utf8')

const importUserData = async () => {
    for (const user in userData) {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(userData[user].Password, saltRounds)
        const newUser = new User({
            UserID: userData[user].UserID,
            Username: userData[user].Username,
            Password: passwordHash,
            Firstname: userData[user].Firstname,
            Lastname: userData[user].Lastname,
            Email: userData[user].Email,
            Address: userData[user].Address,
            OptIntoPhyStatements: userData[user].OptIntoPhyStatements
        })
        await newUser.save()
    }
    console.log("done")
}

const importBankAccountData = async () => {
    for (const account in bankAccountData) {
        const user = await User.findOne({UserID: bankAccountData[account].UserID})
        const userId = user._id
        const newAccount = new BankAccount({
            AccountID: bankAccountData[account].AccountID,
            UserID: bankAccountData[account].UserID,
            AccountType: bankAccountData[account].AccountType,
            Balance: bankAccountData[account].Balance,
            User: userId
        })
        await newAccount.save()
    }
    console.log("done")
}

const importScheduledTransData = async () => {


    for (const trans in scheduledTransactionData) {
        const senderAccNum = scheduledTransactionData[trans].AccountID
        const receiverAccNum = scheduledTransactionData[trans].ReceivingAccountID
        const sender = await BankAccount.findOne({AccountID: senderAccNum})
        const receiver = await BankAccount.findOne({AccountID: receiverAccNum})

        const senderId = sender._id 
        const receiverId = receiver._id
        
        const newTrans = new ScheduledTransaction({
            TransactionID: scheduledTransactionData[trans].TransactionID,
            AccountID: scheduledTransactionData[trans].AccountID,
            ReceivingAccountID: scheduledTransactionData[trans].ReceivingAccountID,
            Date: scheduledTransactionData[trans].Date,
            TransactionAmount: scheduledTransactionData[trans].TransactionAmount,
            Comment: scheduledTransactionData[trans].Comment,
            Sender: senderId,
            Recipient: receiverId
        })
    await newTrans.save()
    }
console.log("done")
}

// importUserData()

const PORT = process.env.PORT
app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })