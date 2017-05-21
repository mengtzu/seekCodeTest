//This file should arguably be named index.js but I've been getting really annoyed with seeing about a thousand
//index.js in file search

import { DISCOUNT_TYPE_FLAT_RATE, DISCOUNT_TYPE_X_FOR_Y, DISCOUNT_TYPE_THRESHOLD } from '../constants/discounts';
import { CLASSIC, STANDOUT, PREMIUM } from '../constants/products';

const GST_RATE = 0.1;  //This is an abstraction, normally we'd care about locale

export const calculateAdTypeSubtotal = ({ adType, quantity, discounts, basePrice}) => {
    let unitPrice = basePrice;
    let quantityForPrice = quantity;

    discounts.forEach((discount) => {
        if (discount.ad === adType) {
            switch (discount.type) {
                case DISCOUNT_TYPE_FLAT_RATE:
                    unitPrice = (unitPrice > discount.price) ? discount.price : unitPrice;
                    break;
                case DISCOUNT_TYPE_THRESHOLD:
                    if ((quantity >= discount.threshold) && (unitPrice > discount.price)) {
                        unitPrice = discount.price;
                    }
                    break;
                case DISCOUNT_TYPE_X_FOR_Y:
                    if ((quantity >= discount.x) && (discount.x > discount.y)) {
                        let multipleOfFullX = Math.trunc(quantity / discount.x);
                        let remainderAds = quantity % discount.x;
                        quantityForPrice = (multipleOfFullX * discount.y) + remainderAds;
                    }
                    break;
            }
        }
    });

    const baseTotal = basePrice * quantity;
    const subTotal = unitPrice * quantityForPrice;
    const savings = baseTotal - subTotal;

    return {
        subTotal,
        savings
    };
};

export const calculateTotal = ({ discounts, products, quantities}) => {
    let classicPrice = 0;
    let standoutPrice = 0;
    let premiumPrice = 0;
    let classicSavings = 0;
    let standoutSavings = 0;
    let premiumSavings = 0;

    if (quantities[CLASSIC] && quantities[CLASSIC].quantity) {
        const calculatedClassicPrice = calculateAdTypeSubtotal({
            adType: CLASSIC,
            quantity: quantities[CLASSIC].quantity,
            basePrice: products[CLASSIC].basePrice,
            discounts
        });

        classicPrice = calculatedClassicPrice.subTotal;
        classicSavings = calculatedClassicPrice.savings;
    }

    if (quantities[STANDOUT] && quantities[STANDOUT].quantity) {
        const calculatedStandoutPrice = calculateAdTypeSubtotal({
            adType: STANDOUT,
            quantity: quantities[STANDOUT].quantity,
            basePrice: products[STANDOUT].basePrice,
            discounts
        });

        standoutPrice = calculatedStandoutPrice.subTotal;
        standoutSavings = calculatedStandoutPrice.savings;
    }

    if (quantities[PREMIUM] && quantities[PREMIUM].quantity) {
        const calculatedPremiumPrice = calculateAdTypeSubtotal({
            adType: PREMIUM,
            quantity: quantities[PREMIUM].quantity,
            basePrice: products[PREMIUM].basePrice,
            discounts
        });

        premiumPrice = calculatedPremiumPrice.subTotal;
        premiumSavings = calculatedPremiumPrice.savings;
    }

    const subTotal = classicPrice + standoutPrice + premiumPrice;
    const savings = classicSavings + standoutSavings + premiumSavings;
    const gst = subTotal * GST_RATE;

    return {
        subTotal,
        gst,
        savings,
        grandTotal: subTotal + gst
    }
};