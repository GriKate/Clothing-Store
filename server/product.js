const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/:num', (req, res) => {
    fs.readFile('server/db/getCatalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            let catalog = JSON.parse(data);
            let product = catalog.find(el => el.id_product === +req.params.num);
            res.send(JSON.stringify(product));
        }
    })
});

module.exports = router;
