import { combineReducers, createStore } from "redux";
import { locationReducer } from "../reducer/AppReducer";
import { filteredReducer } from "../reducer/FilteredReducer";
import { productsFetchingReducer } from "../reducer/ProductsFetchingReducer";


const reducers = combineReducers({
    location: locationReducer,
    filter:filteredReducer,
    products: productsFetchingReducer
})


export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)