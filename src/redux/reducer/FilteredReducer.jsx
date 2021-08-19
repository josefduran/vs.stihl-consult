import { type } from "../types/types";

const filteredStorage = JSON.parse(sessionStorage.getItem("filter"));

const initialState = {
    power: filteredStorage?.power,
    frequent: filteredStorage?.frequent,
    vegetation: filteredStorage?.vegetation,
}

export const filteredReducer = (state = initialState, action) => {

    switch (action.type) {

        case type.filterSelected:
            return {
                ...state,
                power: action.payload.power,
                frequent: action.payload.frequent,
                vegetation: action.payload.vegetation,
            }

        default:
            return state
    }
};

