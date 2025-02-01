import {combineReducers} from "redux";
import {filterReducer} from "./filterReducer";
import {reviewsReducer} from "./reviewsReducer";
import {authReducer} from "./authReducer";
import {shoppingCartReducer} from "./shoppingCartReducer";
import {AIReducer} from "./AIReducer";

export default combineReducers({
    filterReducer,
    reviewsReducer,
    authReducer,
    shoppingCartReducer,
    AIReducer,
})