import { type } from "../types/types";

const products =  JSON.parse(localStorage.getItem('products'));

const initialState = {
    data: products ? products :[]
}

export const productsFetchingReducer = (state = initialState, action) => {

    switch (action.type) {

        case type.getProducts:
            return {
                ...state,
                data:action.payload.data
            }

        default:
            return state
    }
};

