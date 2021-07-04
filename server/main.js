const express = require('express');
const fs = require('fs');
const http = require('http');
const catalog = require('./catalog');
const product = require('./product');
const colors = require('./colors');
const cart = require('./cart');
const app = express();

app.use(express.json());

app.use('/', express.static('public'));

app.use('/catalog', express.static('public/catalog.html'));
app.use('/goods', catalog);

app.use('/product', express.static('public/product.html'));
app.use('/entity', product);

app.use('/colors', colors);

app.use('/mycart', express.static('public/cart.html'));
app.use('/cart', cart);

app.listen(3000, () => console.log('Listen on port 3000...'));
