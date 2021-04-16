const invoice = require('./invoice');
const invoices = require('./invoices.json');
let plays = require('./plays.json');

const main = () => {
    let res = invoice.statement(invoices[0], plays);
    console.log(res);
};
main();
