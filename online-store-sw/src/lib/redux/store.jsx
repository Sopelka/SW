//Core
import { configureStore } from '@reduxjs/toolkit';

//Locals
import { rootReducer } from './rootReducer';

const store = configureStore( {reducer: rootReducer} );

export default store;