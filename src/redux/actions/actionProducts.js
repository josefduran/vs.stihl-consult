import { type } from "../types/types";

export const getProducts = (data) => {

    return {
        type: type.getProducts,
        payload: {
            data
        }
    }
};

export const selectProduct = (product={}) => {
    localStorage.setItem('product',JSON.stringify(product));
    return {
        type: type.productSelectect,
        payload: {
            product
        }
    }
};

export const setLoading = (type) => {
     return {
         type
     }
};

export const setError = (error) => {
    localStorage.setItem('error',JSON.stringify(error));
     return {
         type: type.errorInServer,
         payload: {
            error
        }
     }
};