import { type } from "../types/types";

const dataLocation = JSON.parse(sessionStorage.getItem("location"));

const initialState = {
    address: dataLocation?.address,
    lat: dataLocation?.lat,    
    lng:dataLocation?.lng,
}

export const locationReducer = (state = initialState , action) => {
     
    switch (action.type) {

         case type.locationSelected:
             return{
                 ...state,
                 address: action.payload.address,
                lat: action.payload.lat,
                lng: action.payload.lng,
             }
     
         default:
             return state
     }
};

