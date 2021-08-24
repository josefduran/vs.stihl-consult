import React from 'react'
import { useDispatch} from 'react-redux';
import { selectProduct } from '../redux/actions/actionProducts';
import { getImageProduct } from '../helper/getImageProduct';


export const Card = ({productOnly }) => {
    
    const noFound  = 'https://i.ibb.co/71sL6cC/images.png'

    const {shortDescription="",name="",urlImage, relativeUrl } = productOnly;
    const dispatch = useDispatch();
    
    const handleMoreDetails = (productOnly) => dispatch(selectProduct(productOnly));
    
    return (
        <div className="card">

             {
                (relativeUrl) 
                    ? getImageProduct(relativeUrl[0])
                    : <img src={noFound} alt={noFound} />
            }
            <div className="text_content">
                <h5>{name}</h5>
                <p className="card_desc">{shortDescription}</p>
            </div>

            <div className="container_btn">
                <button onClick={()=>{handleMoreDetails(productOnly)}}>More details</button>
                <button>Other options</button>
            </div>

        </div>
    )
}
