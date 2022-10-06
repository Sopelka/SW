import { combineReducers } from 'redux';

import {
    setNewCartAmount,
    setNewCurrency,
    setNewProductToCart,

} from './reducers';

export const rootReducer = combineReducers({
    setNewCartAmount,
    setNewCurrency,
    setNewProductToCart,
});