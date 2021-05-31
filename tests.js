const Pricing = require(`./pricing.js`)
const chai = require('chai')
const assert = chai.assert;
const expect = chai.expect;
chai.use(require('chai-as-promised'))

describe('calculateDiscountedTotal', () => {

    describe('Fail tests', () => {
        
        it('should fail with param draftTotal < 0', async () => {

            const test = Pricing.calculateDiscountedTotal(-1000);

            await expect(test).to.be.rejectedWith('Invalid input');
        })
        
        it('should fail with param draftTotal not number', async () => {

            const test = Pricing.calculateDiscountedTotal('test');

            await expect(test).to.be.rejectedWith('Invalid input');
        })
    });

    describe('Success tests', () => {
        
        it('should return 0% discount with param draftTotal > 0, < 1000', async () => {

            let draftTotal = 1;
            let result = await Pricing.calculateDiscountedTotal(draftTotal);
            
            expect(result).to.eq(draftTotal);
        })
        
        it('should return 0% discount with param draftTotal > 0, < 1000', async () => {

            let draftTotal = 999;
            let result = await Pricing.calculateDiscountedTotal(draftTotal);

            expect(result).to.eq(draftTotal);
        })
        
        it('should return 3% discount with param draftTotal >= 1000, < 5000: 1000', async () => {

            let draftTotal = 1000;
            let result = await Pricing.calculateDiscountedTotal(draftTotal);

            expect(result).to.eq(draftTotal * 0.97);
        })
        
        it('should return 3% discount with param draftTotal >= 1000, < 5000: 4999', async () => {

            let draftTotal = 4999;
            let result = await Pricing.calculateDiscountedTotal(draftTotal);

            expect(result).to.eq(draftTotal * 0.97);
        })
        
        it('should return 5% discount with param draftTotal >= 5000, < 7000: 5000', async () => {

            let draftTotal = 5000;
            let result = await Pricing.calculateDiscountedTotal(draftTotal);

            expect(result).to.eq(draftTotal * 0.95);
        })
        
        it('should return 5% discount with param draftTotal >= 5000, < 7000: 6999', async () => {

            let draftTotal = 6999;
            let result = await Pricing.calculateDiscountedTotal(draftTotal);

            expect(result).to.eq(draftTotal * 0.95);
        })
        
        it('should return 7% discount with param draftTotal >= 7000, < 10000: 7000', async () => {

            let draftTotal = 7000;
            let result = await Pricing.calculateDiscountedTotal(draftTotal);

            expect(result).to.eq(draftTotal * 0.93);
        })
        
        it('should return 7% discount with param draftTotal >= 7000, < 10000: 9999', async () => {

            let draftTotal = 9999;
            let result = await Pricing.calculateDiscountedTotal(draftTotal);

            expect(result).to.eq(draftTotal * 0.93);
        })
        
        it('should return 10% discount with param draftTotal >= 10000: 11000', async () => {

            let draftTotal = 11000;
            let result = await Pricing.calculateDiscountedTotal(draftTotal);

            expect(result).to.eq(draftTotal * 0.90);
        })
    });
});

describe('calculateTax', () => {

    describe('Fail tests', () => {
        
        it('should fail with param provStateCode not valid', async () => {

            const test = Pricing.calculateTax('DO');

            await expect(test).to.be.rejectedWith('Invalid Province');
        })
        
        it('should fail with param provStateCode not string', async () => {

            const test = Pricing.calculateTax(5);

            await expect(test).to.be.rejectedWith('Invalid Province');
        })
    });

    describe('Success tests', () => {
        
        it('should return 5% tax with param provStateCode: AB', async () => {

            let provStateCode = 'AB';
            let result = await Pricing.calculateTax(provStateCode);
            
            expect(result).to.eq(0.05);
        })
        
        it('should return 13% tax with param provStateCode: ON', async () => {

            let provStateCode = 'ON';
            let result = await Pricing.calculateTax(provStateCode);
            
            expect(result).to.eq(0.13);
        })
        
        it('should return 14.975% tax with param provStateCode: QC', async () => {

            let provStateCode = 'QC';
            let result = await Pricing.calculateTax(provStateCode);
            
            expect(result).to.eq(0.14975);
        })
        
        it('should return 6% tax with param provStateCode: MI', async () => {

            let provStateCode = 'MI';
            let result = await Pricing.calculateTax(provStateCode);
            
            expect(result).to.eq(0.06);
        })
        
        it('should return 0% tax with param provStateCode: DE', async () => {

            let provStateCode = 'DE';
            let result = await Pricing.calculateTax(provStateCode);
            
            expect(result).to.eq(0);
        })
    });
});

describe('calculateTotal', () => {

    describe('Fail tests', () => {
        
        let items = 500;
        let price = 1.00;
        let provStateCode = 'ON';

        it('should fail without param items', async () => {

            const test = Pricing.calculateTotal(
                '',
                price,
                provStateCode,
            );

            await expect(test).to.be.rejectedWith('Invalid input');
        })
        it('should fail without param price', async () => {

            const test = Pricing.calculateTotal(
                items,
                '',
                provStateCode,
            );

            await expect(test).to.be.rejectedWith('Invalid input');
        })
        it('should fail without param provStateCode', async () => {

            const test = Pricing.calculateTotal(
                items,
                price,
                '',
            );

            await expect(test).to.be.rejectedWith('Invalid input');
        })
    });

    describe('Success tests', () => {
        
        it('should return 565 with params 500 1.00 ON', async () => {

            let items = 500;
            let price = 1.00;
            let provStateCode = 'ON';
            
            const result = await Pricing.calculateTotal(
                items,
                price,
                provStateCode,
            );
            
            expect(result).to.eq('565.00');
        })
        
        it('should return 7984.98 with params 3600 2.25 MI', async () => {

            let items = 3600;
            let price = 2.25;
            let provStateCode = 'MI';
            
            const result = await Pricing.calculateTotal(
                items,
                price,
                provStateCode,
            );
            
            expect(result).to.eq('7984.98');
        })
        
    });
});