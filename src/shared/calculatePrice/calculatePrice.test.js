import { calculateTotal, calculateAdTypeSubtotal } from './calculatePrice';
import { CLASSIC, STANDOUT, PREMIUM } from '../constants/products';
import { DISCOUNT_TYPE_FLAT_RATE, DISCOUNT_TYPE_THRESHOLD, DISCOUNT_TYPE_X_FOR_Y } from '../constants/discounts';

let products;
let quantities;

const GST = 0.1;  //We're including this in tests but it's an abstraction as in the implementation
                  //In a real scenario you'd expect locale stuff, we'd get GST rate and applicability from an API
                  //that we'd mock here, etc.

beforeEach(() => {
   products = {};
   products[CLASSIC] = { basePrice: 269.99 };
   products[STANDOUT] = { basePrice: 322.99 };
   products[PREMIUM] = { basePrice: 394.99 };

   quantities = {};
   quantities[CLASSIC] = { quantity: 1 };
   quantities[STANDOUT] = { quantity: 2 };
   quantities[PREMIUM] = { quantity: 3 };
});

test('With no discounts applied, base price should be charged', () => {
   const expectedSubTotal = (products[CLASSIC].basePrice * quantities[CLASSIC].quantity) +
                            (products[STANDOUT].basePrice * quantities[STANDOUT].quantity) +
                            (products[PREMIUM].basePrice * quantities[PREMIUM].quantity);

   const expectedGST = expectedSubTotal * GST;

   expect(calculateTotal({
      discounts: [],
      products,
      quantities
   })).toEqual({
      subTotal: expectedSubTotal,
      savings: 0,
      gst: expectedGST,
      grandTotal: expectedSubTotal + expectedGST
   });
});

test('Ad type subtotals should agree with final total', () => {
   const expectedClassicTotal = (products[CLASSIC].basePrice * quantities[CLASSIC].quantity);
   const expectedStandoutTotal = (products[STANDOUT].basePrice * quantities[STANDOUT].quantity);
   const expectedPremiumTotal = (products[PREMIUM].basePrice * quantities[PREMIUM].quantity);
   const expectedSubTotal = expectedClassicTotal + expectedStandoutTotal + expectedPremiumTotal;
   const expectedGST = expectedSubTotal * GST;

   expect(calculateAdTypeSubtotal({
      adType: CLASSIC,
      quantity: quantities[CLASSIC].quantity,
      basePrice: products[CLASSIC].basePrice,
      discounts: []
   }))
   .toEqual({
      subTotal: expectedClassicTotal,
      savings: 0
   });

   expect(calculateAdTypeSubtotal({
      adType: STANDOUT,
      quantity: quantities[STANDOUT].quantity,
      basePrice: products[STANDOUT].basePrice,
      discounts: []
   }))
   .toEqual({
      subTotal: expectedStandoutTotal,
      savings: 0
   });

   expect(calculateAdTypeSubtotal({
      adType: PREMIUM,
      quantity: quantities[PREMIUM].quantity,
      basePrice: products[PREMIUM].basePrice,
      discounts: []
   }))
   .toEqual({
      subTotal: expectedPremiumTotal,
      savings: 0
   });

   expect(calculateTotal({
      discounts: [],
      products,
      quantities
   }))
   .toEqual({
      subTotal: expectedSubTotal,
      savings: 0,
      gst: expectedGST,
      grandTotal: expectedSubTotal + expectedGST
   });

});

it('Should apply base price discount to specified ad type only', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_FLAT_RATE,
      ad: CLASSIC,
      price: 5
   }];

   const expectedClassicTotal = 5;
   const expectedClassicSavings = (products[CLASSIC].basePrice * quantities[CLASSIC].quantity) - expectedClassicTotal;
   const expectedStandoutTotal = (products[STANDOUT].basePrice * quantities[STANDOUT].quantity);
   const expectedPremiumTotal = (products[PREMIUM].basePrice * quantities[PREMIUM].quantity);

   expect(calculateAdTypeSubtotal({
      adType: CLASSIC,
      quantity: quantities[CLASSIC].quantity,
      basePrice: products[CLASSIC].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedClassicTotal,
      savings: expectedClassicSavings
   });

   expect(calculateAdTypeSubtotal({
      adType: STANDOUT,
      quantity: quantities[STANDOUT].quantity,
      basePrice: products[STANDOUT].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedStandoutTotal,
      savings: 0
   });

   expect(calculateAdTypeSubtotal({
      adType: PREMIUM,
      quantity: quantities[PREMIUM].quantity,
      basePrice: products[PREMIUM].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedPremiumTotal,
      savings: 0
   });
});

it('Should not apply base price discount if that would raise price', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_FLAT_RATE,
      ad: PREMIUM,
      price: 99999999999
   }];

   const expectedPremiumTotal = (products[PREMIUM].basePrice * quantities[PREMIUM].quantity);

   expect(calculateAdTypeSubtotal({
      adType: PREMIUM,
      quantity: quantities[PREMIUM].quantity,
      basePrice: products[PREMIUM].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedPremiumTotal,
      savings: 0
   });
});

it('Should apply threshold discount to specified ad type only, if threshold is met', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_THRESHOLD,
      ad: STANDOUT,
      price: 15,
      threshold: 4
   }];

   quantities[STANDOUT].quantity = 6;

   const expectedClassicTotal = (products[CLASSIC].basePrice * quantities[CLASSIC].quantity);
   const expectedStandoutTotal = 90;
   const expectedStandoutSavings = (products[STANDOUT].basePrice * quantities[STANDOUT].quantity) - expectedStandoutTotal;
   const expectedPremiumTotal = (products[PREMIUM].basePrice * quantities[PREMIUM].quantity);

   expect(calculateAdTypeSubtotal({
      adType: CLASSIC,
      quantity: quantities[CLASSIC].quantity,
      basePrice: products[CLASSIC].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedClassicTotal,
      savings: 0
   });

   expect(calculateAdTypeSubtotal({
      adType: STANDOUT,
      quantity: quantities[STANDOUT].quantity,
      basePrice: products[STANDOUT].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedStandoutTotal,
      savings: expectedStandoutSavings
   });

   expect(calculateAdTypeSubtotal({
      adType: PREMIUM,
      quantity: quantities[PREMIUM].quantity,
      basePrice: products[PREMIUM].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedPremiumTotal,
      savings: 0
   });
});

it('Should not apply threshold discount if threshold is not met', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_THRESHOLD,
      ad: STANDOUT,
      price: 15,
      threshold: 99
   }];

   quantities[STANDOUT].quantity = 6;

   const expectedStandoutTotal = (products[STANDOUT].basePrice * quantities[STANDOUT].quantity);

   expect(calculateAdTypeSubtotal({
      adType: STANDOUT,
      quantity: quantities[STANDOUT].quantity,
      basePrice: products[STANDOUT].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedStandoutTotal,
      savings: 0
   });
});

it('Should not apply threshold discount if that would raise price', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_THRESHOLD,
      ad: STANDOUT,
      price: 9999999999999999999999999,
      threshold: 2
   }];

   quantities[STANDOUT].quantity = 6;

   const expectedStandoutTotal = (products[STANDOUT].basePrice * quantities[STANDOUT].quantity);

   expect(calculateAdTypeSubtotal({
      adType: STANDOUT,
      quantity: quantities[STANDOUT].quantity,
      basePrice: products[STANDOUT].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedStandoutTotal,
      savings: 0
   });
});

it('Should apply X for Y discount to specified ad type only, if threshold is met', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_X_FOR_Y,
      ad: PREMIUM,
      x: 4,
      y: 3
   }];

   quantities[PREMIUM].quantity = 4;

   const expectedClassicTotal = (products[CLASSIC].basePrice * quantities[CLASSIC].quantity);
   const expectedStandoutTotal = (products[STANDOUT].basePrice * quantities[STANDOUT].quantity);
   const expectedPremiumTotal = (products[PREMIUM].basePrice * 3);
   const expectedPremiumSavings = products[PREMIUM].basePrice;

   expect(calculateAdTypeSubtotal({
      adType: CLASSIC,
      quantity: quantities[CLASSIC].quantity,
      basePrice: products[CLASSIC].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedClassicTotal,
      savings: 0
   });

   expect(calculateAdTypeSubtotal({
      adType: STANDOUT,
      quantity: quantities[STANDOUT].quantity,
      basePrice: products[STANDOUT].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedStandoutTotal,
      savings: 0
   });

   expect(calculateAdTypeSubtotal({
      adType: PREMIUM,
      quantity: quantities[PREMIUM].quantity,
      basePrice: products[PREMIUM].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedPremiumTotal,
      savings: expectedPremiumSavings
   });
});

it('Should apply X for Y discount correctly to multiples of threshold and remainders', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_X_FOR_Y,
      ad: PREMIUM,
      x: 4,
      y: 3
   }];

   quantities[PREMIUM].quantity = 10;

   const expectedPremiumTotal = (products[PREMIUM].basePrice * 8);
   const expectedPremiumSavings = products[PREMIUM].basePrice * 2;

   expect(calculateAdTypeSubtotal({
      adType: PREMIUM,
      quantity: quantities[PREMIUM].quantity,
      basePrice: products[PREMIUM].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedPremiumTotal,
      savings: expectedPremiumSavings
   });
});

it('Should not apply X for Y discount if threshold is not met', () => {
   //This test specifically enshrines X being the threshold not y
   //(ie we don't grant extra ads, just discount those bought in sufficient quantities)

   const discounts = [{
      type: DISCOUNT_TYPE_X_FOR_Y,
      ad: PREMIUM,
      x: 4,
      y: 3
   }];

   quantities[PREMIUM].quantity = 3;

   const expectedPremiumTotal = (products[PREMIUM].basePrice * quantities[PREMIUM].quantity);

   expect(calculateAdTypeSubtotal({
      adType: PREMIUM,
      quantity: quantities[PREMIUM].quantity,
      basePrice: products[PREMIUM].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedPremiumTotal,
      savings: 0
   });
});

it('Should not apply X for Y discount if X is not greater than Y', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_X_FOR_Y,
      ad: PREMIUM,
      x: 3,
      y: 3
   }];

   quantities[PREMIUM].quantity = 5;

   const expectedPremiumTotal = (products[PREMIUM].basePrice * quantities[PREMIUM].quantity);

   expect(calculateAdTypeSubtotal({
      adType: PREMIUM,
      quantity: quantities[PREMIUM].quantity,
      basePrice: products[PREMIUM].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedPremiumTotal,
      savings: 0
   });
});

it('Should behave itself even in ridiculous discount stacks', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_FLAT_RATE,
      ad: CLASSIC,
      price: 5
   }, {
      type: DISCOUNT_TYPE_THRESHOLD,
      ad: CLASSIC,
      price: 4,
      threshold: 16
   }, {
      type: DISCOUNT_TYPE_X_FOR_Y,
      ad: CLASSIC,
      x: 15,
      y: 10
   }, {
      type: DISCOUNT_TYPE_FLAT_RATE,
      ad: STANDOUT,
      price: 2
   }, {
      type: DISCOUNT_TYPE_THRESHOLD,
      ad: STANDOUT,
      price: 16,
      threshold: 2
   }, {
      type: DISCOUNT_TYPE_X_FOR_Y,
      ad: STANDOUT,
      x: 23,
      y: 22
   }, {
      type: DISCOUNT_TYPE_FLAT_RATE,
      ad: PREMIUM,
      price: 99999
   }, {
      type: DISCOUNT_TYPE_THRESHOLD,
      ad: STANDOUT,
      price: 2,
      threshold: 99999999999
   },{
      type: DISCOUNT_TYPE_X_FOR_Y,
      ad: PREMIUM,
      x: 5,
      y: 3
   }];

   quantities[CLASSIC].quantity = 32;
   quantities[STANDOUT].quantity = 3;
   quantities[PREMIUM].quantity = 99;

   const expectedClassicTotal = 88;
   const expectedClassicSavings = (products[CLASSIC].basePrice * quantities[CLASSIC].quantity) - expectedClassicTotal;
   const expectedStandoutTotal = 6;
   const expectedStandoutSavings = (products[STANDOUT].basePrice * quantities[STANDOUT].quantity) - expectedStandoutTotal;
   const expectedPremiumTotal = (products[PREMIUM].basePrice * 61);
   const expectedPremiumSavings = (products[PREMIUM].basePrice * quantities[PREMIUM].quantity) - expectedPremiumTotal;
   const expectedSubTotal = expectedClassicTotal + expectedStandoutTotal + expectedPremiumTotal;
   const expectedTotalSavings = expectedClassicSavings + expectedStandoutSavings + expectedPremiumSavings;
   const expectedGST = expectedSubTotal * GST;

   expect(calculateAdTypeSubtotal({
      adType: CLASSIC,
      quantity: quantities[CLASSIC].quantity,
      basePrice: products[CLASSIC].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedClassicTotal,
      savings: expectedClassicSavings
   });

   expect(calculateAdTypeSubtotal({
      adType: STANDOUT,
      quantity: quantities[STANDOUT].quantity,
      basePrice: products[STANDOUT].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedStandoutTotal,
      savings: expectedStandoutSavings
   });

   expect(calculateAdTypeSubtotal({
      adType: PREMIUM,
      quantity: quantities[PREMIUM].quantity,
      basePrice: products[PREMIUM].basePrice,
      discounts: discounts
   }))
   .toEqual({
      subTotal: expectedPremiumTotal,
      savings: expectedPremiumSavings
   });

   expect(calculateTotal({
      discounts: discounts,
      products,
      quantities
   }))
   .toEqual({
      subTotal: expectedSubTotal,
      savings: expectedTotalSavings,
      gst: expectedGST,
      grandTotal: expectedSubTotal + expectedGST
   });
});

//Magic ints in following tests are as per code test brief, will break if you change the mock values above
//You probably wouldn't have tests like this in real life, but it's good to answer the brief!

it('Fulfils the first code test example scenario - default', () => {
   quantities[CLASSIC].quantity = 1;
   quantities[STANDOUT].quantity = 1;
   quantities[PREMIUM].quantity = 1;

   const expectedSubTotal = 987.97;

   expect(calculateTotal({
      discounts: [],
      products,
      quantities
   }).subTotal)
   .toEqual(expectedSubTotal);
});

it('Fulfils the second code test example scenario - Unilever', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_X_FOR_Y,
      ad: CLASSIC,
      x: 3,
      y: 2
   }];

   quantities[CLASSIC].quantity = 3;
   quantities[STANDOUT].quantity = 0;
   quantities[PREMIUM].quantity = 1;

   const expectedSubTotal = 934.97;

   expect(calculateTotal({
      discounts: discounts,
      products,
      quantities
   }).subTotal)
   .toEqual(expectedSubTotal);
});

it('Fulfils the third code test example scenario - Apple', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_FLAT_RATE,
      ad: STANDOUT,
      price: 299.99
   }];

   quantities[CLASSIC].quantity = 0;
   quantities[STANDOUT].quantity = 3;
   quantities[PREMIUM].quantity = 1;

   const expectedSubTotal = 1294.96;

   expect(calculateTotal({
      discounts: discounts,
      products,
      quantities
   }).subTotal)
   .toEqual(expectedSubTotal);
});

it('Fulfils the fourth code test example scenario - Nike', () => {
   const discounts = [{
      type: DISCOUNT_TYPE_THRESHOLD,
      ad: PREMIUM,
      threshold: 4
   }];

   quantities[CLASSIC].quantity = 0;
   quantities[STANDOUT].quantity = 0;
   quantities[PREMIUM].quantity = 4;

   const expectedSubTotal = 1519.96;

   expect(calculateTotal({
      discounts: discounts,
      products,
      quantities
   }).subTotal)
   .toEqual(expectedSubTotal);
});