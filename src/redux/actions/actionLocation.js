import { type } from "../types/types";

export const locationSelected = (address, lat="", lng="") => {
    
    const dataLocation = { address, lat, lng };
    
    sessionStorage.setItem("location", JSON.stringify(dataLocation));
    
    return {
        type: type.locationSelected,
        payload: {
            address,
            lat,
            lng
        }
    }
};