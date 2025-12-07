const express = require('express');
const fs = require('fs');
const logger = require('./logger');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
        res.send(data);
    })
});

// add new product
router.post('/', (req, res) => {
    fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let cart = JSON.parse(data);
            cart.contents.push(req.body);
            let name = req.body.product_name;

            cart.productsQuantity = 0;
            cart.contents.map( el => cart.productsQuantity += parseInt(el.quantity));

            cart.totalAmount = 0;
            for (let el of cart.contents) {
                cart.totalAmount += el.price * el.quantity;
            }

            let newCart = JSON.stringify(cart, null, 4);
            fs.writeFile('server/db/getBasket.json', newCart, (err, data) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 5, text: 'SUCCESS!'}));
                    // logger(name, 'add');
                }
            })
        }
    });
});

// change product
router.put('/:num', (req, res) => {
    
    const num = parseInt(req.params.num);
    if (num < 1) {
        res.sendStatus(404, JSON.stringify({result: 0, text: 'Not valid ID'}));
    } else {
        fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus(404, JSON.stringify({result: 0, text: err}));
            } else {

                const serverCart = JSON.parse(data);
                const find = serverCart.contents.find(el => el.id === num);
                const newQuantity = parseInt(req.body.quantity);
                // const name = find.product_name;

                if (newQuantity > 0) {
                    find.quantity = newQuantity;
                }

                serverCart.totalAmount = 0;
                serverCart.contents.map( el => {
                    serverCart.totalAmount += el.price * el.quantity;
                })

                serverCart.productsQuantity = 0;
                serverCart.contents.map( el => serverCart.productsQuantity += parseInt(el.quantity));

                const newCart = JSON.stringify(serverCart, null, 4);
                fs.writeFile('server/db/getBasket.json', newCart, (err, data) => {
                    if (err) {
                        res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                    } else {
                        res.send(JSON.stringify({result: 3, text: 'SUCCESS!'}));
                        // logger(name, 'quantity change');
                    }
                })
            }
        })
    }
});

router.delete('/:num?', (req, res) => {

    const num = parseInt(req.params.num);
    // delete product by id
    if (num) {
        fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus(404, JSON.stringify({result: 0, text: err}));
            } else {
                const cart = JSON.parse(data);
                const find = cart.contents.find(el => el.id === num);
                // const name = find.product_name;

                cart.contents.splice(cart.contents.indexOf(find), 1);
                cart.productsQuantity = 0;
                cart.contents.map( el => cart.productsQuantity += parseInt(el.quantity));

                cart.totalAmount = 0;
                cart.contents.map( el => {
                    cart.totalAmount += el.price * el.quantity;
                })

                const newCart = JSON.stringify(cart, null, 4);
                fs.writeFile('server/db/getBasket.json', newCart, (err, data) => {
                    if (err) {
                        res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                    } else {
                        res.send(JSON.stringify({result: 1, text: 'SUCCESS!'}));
                        // logger(name, 'delete');
                    }
                })
            }
        })
    } else {
        // clear all cart
        fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus(404, JSON.stringify({result: 0, text: err}));
            } else {
                let cart = JSON.parse(data);

                cart.contents = [];
                cart.productsQuantity = 0;
                cart.totalAmount = 0;
                const newCart = JSON.stringify(cart, null, 4);
                fs.writeFile('server/db/getBasket.json', newCart, (err, data) => {
                    if (err) {
                        res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                    } else {
                        res.send(JSON.stringify({result: 2, text: 'SUCCESS!'}));
                        logger('all', 'delete');
                    }
                })
            }
        })
    }
});

module.exports = router;
