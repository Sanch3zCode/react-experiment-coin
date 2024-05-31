const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
const cookieParser = require('cookie-parser');

const path = require('path');
const cors = require('cors');

const usersRouter = require('./routes/users');
const transactionsRouter = require('./routes/transactions');

const app = express();
const host = '192.168.1.156';
const port = 5000;

mongoose.connect('mongodb://localhost:27017/social-coin')
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB connection error:', err));

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`);
});