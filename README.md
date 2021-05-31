# Pricing Library

An application to calculate the total cost of an order.

- @param   {number}    numberItems     Number of items.
- @param   {number}    costPerItem     Cost per item.
- @param   {string}    provStateCode   Province/state code.
- @returns Total cost.

The total price is calculated by:

- calculate the total cost for the items
- deduct discount based on the quantity
- add sales tax based on the province/state code

## Run

Clone this repository, and navigate to its directory.

Install dependencies.

```npm i```

Run application

```node main.js 500 1.00 ON```

## Testing

Run tests.

```npm test```