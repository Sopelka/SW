import { types } from './actionTypes';

export const setNewCartAmount = (payload) => ({
    type: types.SET_NEW_TOTAL_CART_AMOUNT,
    payload,
});

export const setNewCurrency = (payload) => ({
    type: types.SET_NEW_CURRENCY,
    payload,
});

export const setNewProductToCart = (payload) => ({
    type: types.SET_NEW_PRODUCT_TO_CART,
    payload,
});
