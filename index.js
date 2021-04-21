const {statement, htmlStatement} = require('./statement');
const invoices = require('./invoices.json');
let plays = require('./plays.json');

/* TODO: P.64 부터 */
const main = () => {
    let res = statement(invoices[0], plays);
    let htmlRes = htmlStatement(invoices[0], plays);
    console.log(res);
    console.log(htmlRes);
};
main();
