import curInfo from "./curInfo";
import { combineReducers } from "redux";

const reducers = combineReducers({ 
   info: curInfo
});

export default reducers;