import { type } from "../types/types";

const product =  JSON.parse(localStorage.getItem('product'));
const error =  JSON.parse(localStorage.getItem('error'));

const otherproducts =  JSON.parse(localStorage.getItem('optionProducts'));

const initialState = {
    data: {},
    productSelected: product ? product : {},
    loading: null,
    error,
    otherOptions: otherproducts ? otherproducts : []
}

export const productsFetchingReducer = (state = initialState, action) => {

    switch (action.type) {

        case type.getProducts:
            return {
                ...state,
                data: action.payload.data
            }
            
        case type.starLoading:
            return {
                ...state,
                loading: true
            }

        case type.endLoading:
            return {
                ...state,
                loading: false
            }

        case type.productSelectect:
            return {
                ...state,
                productSelected: action.payload.product
            }

        case type.errorInServer:
            return {
                ...state,
                error: action.payload.error
            }

        case type.otherOptionsProducts:
            return {
                ...state,
                otherOptions: action.payload.data
            }

        default:
            return state
    }
};

