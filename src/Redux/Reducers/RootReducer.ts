import { combineReducers } from "@reduxjs/toolkit";
import { TableReducer } from './TableReducer/TableReducer';
import { ModalsReducer } from './ModalsReducer/ModalsReducer';
import { StoreProductReducer } from './StoreProductReducers/StoreProductReducer';

export const rootReducer = combineReducers({
    TableReducer,
    ModalsReducer,
    StoreProductReducer
});
