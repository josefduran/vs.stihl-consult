import { getImageProduct } from "../helper/getImageProduct"

export const ProductSelected = ({ longDescription="",name="",category="",pcId="" ,relativeUrl}) => {
    return (
        <div>
             <h2>{name}</h2>
             <p>{longDescription}</p>
             <p>{pcId}</p>
             {
                (relativeUrl) 
                    ? getImageProduct(relativeUrl[0])
                    : <img src={guante} alt="./assets/loading.gif" />
            } 
             <p>{category}</p>
        </div>
    )
}
