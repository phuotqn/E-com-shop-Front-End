import { createStore, combineReducers } from "redux";
import ActionHandle from "../components/ActionHandle";
import CartHandle from "../components/CartHandle";

const appReducer = combineReducers({
    taskReducer: ActionHandle,
    cartReducer: CartHandle
});

const store = createStore(
    appReducer,
    undefined,
    undefined);

export default store;