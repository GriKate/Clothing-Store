const moment = require('moment');
const fs = require('fs');

const logger = (name, action) => {
    fs.readFile('server/db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // массив с имеющимися записями лога
            const stat = JSON.parse(data);
            stat.push({
                time: moment().format('MMMM Do YYYY h:mm:ss a'),
                product_name: name,
                action: action
            });
            fs.writeFile('server/db/stats.json', JSON.stringify(stat, null, 4), (err) => {
                if (err) console.log(err);
            })
        }
    })
};

module.exports = logger;
