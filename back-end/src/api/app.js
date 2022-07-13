const express = require('express');
const handleError = require('./middleware/handleError');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/api/products', productsRouter);
app.use('/api/sales', salesRouter);

app.use(handleError);

module.exports = app;

// iniciando
