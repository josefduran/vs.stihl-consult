import { type } from "../types/types";

export const addProductToCar = (data=[]) => {

    localStorage.setItem("car",JSON.stringify(data))

    return {
        type: type.addToCar,
        payload: {
            carToAdd: data
        }
    }
};