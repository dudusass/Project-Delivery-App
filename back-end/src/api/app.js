const express = require('express');
const handleError = require('./middleware/handleError');
const usersRouter = require('./routes/userRouter');

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);

app.use(handleError);

module.exports = app;
