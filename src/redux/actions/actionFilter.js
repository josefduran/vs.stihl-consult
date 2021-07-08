import { type } from "../types/types";

export const filterSelected = (power,frequent,vegetation) => {

    return {
        type: type.filterSelected,
        payload: {
            power,
            frequent,
            vegetation,
        }
    }
};