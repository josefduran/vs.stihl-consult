import { type } from "../types/types";

export const locationSelected = (location) => {
    

    sessionStorage.setItem("location", location);
    
    return {
        type: type.locationSelected,
        payload: {
            location
        }
    }
};