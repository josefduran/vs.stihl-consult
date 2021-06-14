import { type } from "../types/types";


const initialState = {
    location: sessionStorage.getItem("location")
}

export const locationReducer = (state = initialState , action) => {
     
    switch (action.type) {

         case type.locationSelected:
             return{
                location: action.payload.location
             }
     
         default:
             return state
     }
};



// {
//    location: '',
//     
// }