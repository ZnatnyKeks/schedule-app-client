import { combineReducers } from "redux";
import userReducer from './UserSlice';

export const rootReducer = combineReducers({userReducer})
