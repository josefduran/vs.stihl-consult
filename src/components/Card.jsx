import React from 'react'
import { useDispatch} from 'react-redux';
import { selectProduct } from '../redux/actions/actionProducts';
import { getImageProduct } from '../helper/getImageProduct';

import noFound from '../assets/images.png'

export const Card = ({productOnly }) => {
    
    
    const {shortDescription="",name="",urlImage, relativeUrl, power } = productOnly;
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
                {/* <p className="card_desc"> <b>Price: ${ (prices?.length !== 0) ? prices[0].amount: '0.0' }</b></p>
                <p className="card_desc">Category: <u>{category}</u></p>
                <p className="" style={{color:'red'}}>PcID: <b>{pcId}</b></p>
                <p className="" style={{color:'blue'}}>sku: <b>{prices[0]?.sku}</b></p>
                <p className="card_desc">Tags: <u>{tags.toLowerCase()}</u></p>
                <p className="card_desc">Lawn size: <b>{lawnSize.toLowerCase()}</b></p> */}
                
            </div>

            <div className="container_btn">
                <button onClick={()=>{handleMoreDetails(productOnly)}}>More details</button>
                <button>Other options</button>
            </div>

        </div>
    )
}
