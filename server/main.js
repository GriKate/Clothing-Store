const express = require('express');
const cors = require('cors');
const fs = require('fs');
const http = require('http');
const catalog = require('./catalog.js');
const product = require('./product.js');
const colors = require('./colors.js');
const cart = require('./cart.js');
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/', express.static('public'));

app.use('/catalog', express.static('public/catalog.html'));
app.use('/goods', catalog);

app.use('/product', express.static('public/product.html'));
app.use('/entity', product);

app.use('/colors', colors);

app.use('/cart', express.static('public/cart.html'));

// app.get('/cart1', (req, res) => {
//     fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
//         res.send(data);
//     })
// });
app.use('/getCart', cart);

app.get('/test', (req, res) => {
    res.send('test');
});

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
}

module.exports = app;
