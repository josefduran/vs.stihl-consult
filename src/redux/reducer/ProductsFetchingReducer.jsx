import { type } from "../types/types";

const products =  JSON.parse(localStorage.getItem('products'));
const images =  JSON.parse(localStorage.getItem('images'));

const initialState = {
    data: products ? products : [],
    pathImg: images ? images : []
}

export const productsFetchingReducer = (state = initialState, action) => {

    switch (action.type) {

        case type.getProducts:
            return {
                ...state,
                data: action.payload.data
            }

        case type.getPathUrlImages:
            return {
                ...state,
                pathImg: action.payload.imgpath
            }

        default:
            return state
    }
};

