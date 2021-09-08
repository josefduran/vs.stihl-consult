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

export const changeStateModal = (modal=false) => {

    return {
        type: type.changeStateModal,
        payload: {
            modal
        }
    }
};