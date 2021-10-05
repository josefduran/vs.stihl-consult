import { type } from "../types/types";

const carStorage = JSON.parse(localStorage.getItem("car"));
const trashStorage = JSON.parse(localStorage.getItem("trash"));

const initialState = {
    car: (carStorage) ? carStorage : [],
    trash: (trashStorage) ? trashStorage : [],
    modal: false
}

export const carReducer = (state = initialState, action) => {

    switch (action.type) {

        case type.addToCar:
            return {
                ...state,
                car: action.payload.carToAdd
            }

        case type.addToTrash:
            return {
                ...state,
                trash: action.payload.trashToAdd
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

