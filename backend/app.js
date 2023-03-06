require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware
const middleware = require('./utils/middleware');

// Routes
const loginRouter = require('./controllers/login');
const accountsRouter = require('./controllers/viewAccounts');
const transactionsRouter = require('./controllers/viewTransactions');
const makeTransactionRouter = require('./controllers/makeTransaction');
const authUser = require('./controllers/auth');

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(() => console.log("successfully connected to MongoDB"))
    .catch((error) => console.log("error connecting to MongoDB:", error.message));

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter);
app.use('/api/auth', authUser);
app.use('/api/accounts', accountsRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/makeTransaction', makeTransactionRouter);

module.exports = app;