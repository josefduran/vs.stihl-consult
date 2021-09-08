import { type } from "../types/types";

const carStorage = JSON.parse(localStorage.getItem("car"));

const initialState = {
    car: (carStorage) ? carStorage : [],
    modal: false
}

export const carReducer = (state = initialState, action) => {

    switch (action.type) {

        case type.addToCar:
            return {
                ...state,
                car: action.payload.carToAdd
            }

        case type.changeStateModal:
            return {
                ...state,
                modal: action.payload.modal
            }

        default:
            return state
    }
};

