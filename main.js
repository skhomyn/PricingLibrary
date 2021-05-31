const Pricing = require(`./pricing.js`);

(async function main() {

    let myArgs = process.argv.slice(2);
    let numberItems = myArgs[0];
    let costPerItem = myArgs[1];
    let provStateCode = myArgs[2];

    const result = await Pricing.calculateTotal(
        numberItems,
        costPerItem,
        provStateCode,
    );

    console.log('$' + result)
})();