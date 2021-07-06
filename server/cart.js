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

            cart.productsQuantity = cart.contents.length;

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
                    logger(name, 'add');
                }
            })
        }
    });
});

// change product
router.put('/:num', (req, res) => {
    // id in req.params comes as a string
    const num = +req.params.num;
    if (num < 1) {
        res.sendStatus(404, JSON.stringify({result: 0, text: 'Not valid ID'}));
    } else {
        fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus(404, JSON.stringify({result: 0, text: err}));
            } else {
                let cart = JSON.parse(data);
                let find = cart.contents.find(el => el.id_product === num);
                let name = find.product_name;
                // if quantity is positive number, set it like product quantity
                if (req.body.quantity > 1) {
                    find.quantity = +req.body.quantity;
                } else if (req.body.quantity === 1) {
                    find.quantity++;
                } else if (req.body.quantity === -1) {
                    find.quantity--;
                }

                cart.totalAmount = 0;
                for (let el of cart.contents) {
                    cart.totalAmount += el.price * el.quantity;
                }

                let newCart = JSON.stringify(cart, null, 4);
                fs.writeFile('server/db/getBasket.json', newCart, (err, data) => {
                    if (err) {
                        res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                    } else {
                        res.send(JSON.stringify({result: 3, text: 'SUCCESS!'}));
                        logger(name, 'quantity change');
                    }
                })
            }
        })
    }
});

router.delete('/:num?', (req, res) => {
    // id in req.params comes as a string
    const num = +req.params.num;
    // delete product by id
    if (num) {
        fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus(404, JSON.stringify({result: 0, text: err}));
            } else {
                let cart = JSON.parse(data);

                let find = cart.contents.find(el => el.id_product === num);
                let name = find.product_name;

                cart.contents.splice(cart.contents.indexOf(find), 1);
                cart.productsQuantity--;

                cart.totalAmount = 0;
                for (let el of cart.contents) {
                    cart.totalAmount += el.price * el.quantity;
                }

                let newCart = JSON.stringify(cart, null, 4);
                fs.writeFile('server/db/getBasket.json', newCart, (err, data) => {
                    if (err) {
                        res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                    } else {
                        res.send(JSON.stringify({result: 1, text: 'SUCCESS!'}));
                        logger(name, 'delete');
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
                let newCart = JSON.stringify(cart, null, 4);
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
