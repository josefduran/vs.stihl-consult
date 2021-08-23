import { type } from "../types/types";

export const filterSelected = (power,frequent,vegetation) => {
    const value = { power,frequent,vegetation }
    sessionStorage.setItem("filter", JSON.stringify(value))

    return {
        type: type.filterSelected,
        payload: {
            power,
            frequent,
            vegetation,
        }
    }
};