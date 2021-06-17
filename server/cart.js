const express = require('express');
const fs = require('fs');
const logger = require('./logger');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
        res.send(data);
    })
});

router.post('/', (req, res) => {
    fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
        if (err) {
            // ошибка чтения
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let cart = JSON.parse(data);
            cart.contents.push(req.body);
            let name = req.body.product_name;

            // увеличиваем количество товаров корзины
            cart.productsQuantity = cart.contents.length;

            // пересчитываем общую сумму
            cart.totalAmount = 0;
            for (let el of cart.contents) {
                cart.totalAmount += el.price * el.quantity;
            }

            let newCart = JSON.stringify(cart, null, 4);
            fs.writeFile('server/db/getBasket.json', newCart, (err, data) => {
                if (err) {
                    // ошибка пересохранения
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    // переводим в JSON и отправляем
                    // 5
                    res.send(JSON.stringify({result: 5, text: 'SUCCESS!'}));
                    logger(name, 'add');
                }
            })
        }
    });
});

router.put('/:num', (req, res) => {
    if (+req.params.num < 1) {
        // id!
        // здесь всегда будет приводиться к положительному числу, даже если пришло отрицательное!
        // нужно обрабатывать эту ошибку на фронте!
        // id!!!!!!!!
        res.sendStatus(404, JSON.stringify({result: 0, text: 'Products quantity must be more then 1'}));
    } else {
        fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
            if (err) {
                // ошибка чтения
                res.sendStatus(404, JSON.stringify({result: 0, text: err}));
            } else {
                let cart = JSON.parse(data);
                let find = cart.contents.find(el => el.id_product === +req.params.num);
                let name = find.product_name;
                // если полученное количество - положительное число,
                // задаём его как количество товара
                if (req.body.quantity > 1) {
                    find.quantity = +req.body.quantity;
                } else if (req.body.quantity === 1) {
                    // если полученное количество = 1, +1
                    find.quantity++;
                } else if (req.body.quantity === -1) {
                    // если полученное количество = -1,
                    // уменьшаем количество товара на 1
                    find.quantity--;
                }

                // пересчитываем общую сумму
                cart.totalAmount = 0;
                for (let el of cart.contents) {
                    cart.totalAmount += el.price * el.quantity;
                }

                // массив корзины пересохраняем в JSON-формат
                let newCart = JSON.stringify(cart, null, 4);
                // пересохраняем корзину на сервере - файл getBasket.json
                fs.writeFile('server/db/getBasket.json', newCart, (err, data) => {
                    if (err) {
                        // ошибка пересохранения
                        res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                    } else {
                        // переводим в JSON и отправляем
                        // 5
                        res.send(JSON.stringify({result: 3, text: 'SUCCESS!'}));
                        logger(name, 'quantity change');
                    }
                })
            }
        })
    }
});

// 4
router.delete('/:num?', (req, res) => {
    if (+req.params.num) {
        fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
            if (err) {
                // ошибка чтения
                res.sendStatus(404, JSON.stringify({result: 0, text: err}));
            } else {
                // парсим getBasket.json - корзину на сервере - в массив
                let cart = JSON.parse(data);
                // находим товар в корзине на сервере
                // в req.params.num приходит id строкой вида "124"
                let find = cart.contents.find(el => el.id_product === +req.params.num);
                let name = find.product_name;
                // удаляем товар из корзины на сервере (массива)
                cart.contents.splice(cart.contents.indexOf(find), 1);
                // уменьшаем количество товаров на 1
                cart.productsQuantity--;
                // пересчитываем общую сумму
                cart.totalAmount = 0;
                for (let el of cart.contents) {
                    cart.totalAmount += el.price * el.quantity;
                }
                // массив корзины пересохраняем в JSON-формат
                let newCart = JSON.stringify(cart, null, 4);
                // пересохраняем корзину на сервере - файл getBasket.json
                fs.writeFile('server/db/getBasket.json', newCart, (err, data) => {
                    if (err) {
                        // ошибка пересохранения
                        res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                    } else {
                        // переводим в JSON и отправляем
                        // 5
                        res.send(JSON.stringify({result: 1, text: 'SUCCESS!'}));
                        logger(name, 'delete');
                    }
                })
            }
        })
    } else {
        fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
            if (err) {
                // ошибка чтения
                res.sendStatus(404, JSON.stringify({result: 0, text: err}));
            } else {
                // парсим getBasket.json - корзину на сервере - в массив
                let cart = JSON.parse(data);
                // нельзя сделать полностью пустым объект корзины,
                // тк тогда Vue будет выдавать ошибку итерации массива в mounted()
                cart.contents = [];
                cart.productsQuantity = 0;
                cart.totalAmount = 0;
                let newCart = JSON.stringify(cart, null, 4);
                fs.writeFile('server/db/getBasket.json', newCart, (err, data) => {
                    if (err) {
                        // ошибка пересохранения
                        res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                    } else {
                        // переводим в JSON и отправляем
                        res.send(JSON.stringify({result: 2, text: 'SUCCESS!'}));
                        logger('all', 'delete');
                    }
                })
            }
        })
    }
});

module.exports = router;
