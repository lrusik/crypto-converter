import info from "./info";
import converter from "./converter";
import label from "./label";
import { combineReducers } from "redux";

const reducers = combineReducers({ 
   info: info,
   converter: converter, 
   label: label
});

export default reducers;