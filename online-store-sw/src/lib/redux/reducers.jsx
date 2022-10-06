import { types } from './actionTypes';

export const setNewCartAmount = (state = 0, action) => {
    switch (action.type) {
        case types.SET_NEW_TOTAL_CART_AMOUNT:
            return action.payload;
        default:
            return state;
    }
};

export const setNewCurrency = (state = [ "$", "USD" ], action) => {
    switch (action.type) {
        case types.SET_NEW_CURRENCY:
            return action.payload;
        default:
            return state;
    }
};

export const setNewProductToCart = (state = [], action) => {
    switch (action.type) {
        case types.SET_NEW_PRODUCT_TO_CART:
            return [...action.payload]
            // if (state.length > 1) {
            //     return [...state, ...action.payload]
            // }
            // else {
            //     return [...action.payload]
            // }
        default:
            return state;
    }
};