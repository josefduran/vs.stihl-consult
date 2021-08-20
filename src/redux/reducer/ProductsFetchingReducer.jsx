import { type } from "../types/types";

const product =  JSON.parse(localStorage.getItem('product'));
const error =  JSON.parse(localStorage.getItem('error'));

const initialState = {
    data: {
        battery:[],
        electric:[],
        gas:[],
        others:[]
    },
    productSelected: product ? product : {},
    loading: null,
    error
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

        default:
            return state
    }
};

