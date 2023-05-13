import { combineReducers } from "@reduxjs/toolkit";
import { TableReducer } from './TableReducer/TableReducer';
import { ModalsReducer } from './ModalsReducer/ModalsReducer';

export const rootReducer = combineReducers({
    TableReducer,
    ModalsReducer
});
