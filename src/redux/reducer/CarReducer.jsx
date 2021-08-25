import { type } from "../types/types";

const carStorage = JSON.parse(sessionStorage.getItem("car"));

const initialState = {
    car: (carStorage?.length !== 0) ? carStorage : []
}

export const carReducer = (state = initialState, action) => {

    switch (action.type) {

        case type.addToCar:
            return {
                ...state,
                car: action.payload.carToAdd
            }

        default:
            return state
    }
};

