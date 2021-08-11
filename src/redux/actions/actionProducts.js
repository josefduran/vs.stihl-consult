import { type } from "../types/types";

export const getProducts = (data=[]) => {
    
    localStorage.setItem('products',JSON.stringify(data));

    return {
        type: type.getProducts,
        payload: {
            data
        }
    }
};