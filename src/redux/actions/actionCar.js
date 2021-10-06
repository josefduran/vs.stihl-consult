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

export const addProductToTrash = (data=[]) => {
    
    localStorage.setItem("trash",JSON.stringify(data))

    return {
        type: type.addToTrash,
        payload: {
            trashToAdd: data
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