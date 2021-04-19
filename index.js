const statement = require('./statement');
const invoices = require('./invoices.json');
let plays = require('./plays.json');

const main = () => {
    let res = statement(invoices[0], plays);
    console.log(res);
};
main();
