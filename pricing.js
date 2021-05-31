
/**
 * Calculates discounted total.
 * @param   {number}     draftTotal  Price multiplied by number of items.
 * @returns Discounted total.
 */
const calculateDiscountedTotal = (draftTotal) => {
    let discountRate;

    if (draftTotal < 0 || typeof draftTotal !== 'number')
        return Promise.reject('Invalid input'); 
    else if (draftTotal < 1000) 
        discountRate = 0;
    else if (draftTotal < 5000) 
        discountRate = 0.03;
    else if (draftTotal < 7000) 
        discountRate = 0.05;
    else if (draftTotal < 10000) 
        discountRate = 0.07;
    else if (draftTotal >= 10000) 
        discountRate = 0.10;
    
    let discountedTotal = draftTotal * (1 - discountRate);  

    return Promise.resolve(discountedTotal);
}

/**
 * Calculates tax rate for a province/state.
 * @param   {string}    provStateCode   Province/state code.
 * @returns Tax rate corresponding to province/state.
 */
const calculateTax = (provStateCode) => {
    let tax;

    switch(provStateCode) {
        case 'AB':
            tax = 0.05;
            break;
        case 'ON':
            tax = 0.13;
            break;
        case 'QC':
            tax = 0.14975;
            break;
        case 'MI':
            tax = 0.06;
            break;
        case 'DE':
            tax = 0;
            break;
        default:
            return Promise.reject('Invalid Province');
    }
    return Promise.resolve(tax);
}

/**
 * Calculates total cost of an order.
 * @param   {number}    numberItems     Number of items.
 * @param   {number}    costPerItem     Cost per item.
 * @param   {string}    provStateCode   Province/state code.
 * @returns Total cost.
 */
const calculateTotal = async (numberItems, costPerItem, provStateCode) => {
    if (!numberItems || !costPerItem || !provStateCode)
        return Promise.reject('Invalid input'); 
    let draftTotal = numberItems * costPerItem;
    
    try {
        let discountedTotal = await calculateDiscountedTotal(draftTotal)
        let tax = discountedTotal * await calculateTax(provStateCode)
        let finalTotal = (discountedTotal + tax).toFixed(2); 

        return finalTotal;
    } catch(e) {
        console.log('error', e)
        return e;
    }
};

module.exports = {
    calculateDiscountedTotal,
    calculateTax,
    calculateTotal,
}