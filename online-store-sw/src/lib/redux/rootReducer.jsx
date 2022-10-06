//Core
import { combineReducers } from 'redux';

//Locals
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