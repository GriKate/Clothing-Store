const express = require('express');
const fs = require('fs');
const http = require('http');
const catalog = require('./catalog');
const product = require('./product');
const colors = require('./colors');
const cart = require('./cart');
const app = express();

// ???
app.use(express.json());

// обрабатываем запрос для главной страницы - index.html в папке public
app.use('/', express.static('public'));

// catalog page
app.use('/catalog', express.static('public/catalog.html'));
app.use('/goods', catalog);

// product page
app.use('/product', express.static('public/product.html'));
// app.use('/product', product);
app.use('/entity', product);
// colors
app.use('/colors', colors);

// cart page
app.use('/mycart', express.static('public/cart.html'));
// 3
app.use('/cart', cart);

app.listen(3000, () => console.log('Listen on port 3000...'));