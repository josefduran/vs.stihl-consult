import { type } from "../types/types";

export const getProducts = (data=[]) => {
    
    localStorage.setItem('products',JSON.stringify(data));

    return {
        type: type.getProducts,
        payload: {
            data
        }
    }
};


export const getPathImages = (images=[]) => {
    //localStorage.setItem('images',JSON.stringify(images));
    return {
        type: type.getPathUrlImages,
        payload: {
            imgpath: images
        }
    }
};