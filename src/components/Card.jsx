import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import guante from '../assets/guantes.jpg'
import { selectProduct } from '../redux/actions/actionProducts';

export const Card = ({ prices=[],features=[],shortDescription="",name="",category="",pcId="",index=0 , urlImage}) => {
    
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.products);
    const option_filter = useSelector(state => state.filter);
    
    const handleMoreDetails = (index) => {
        const opt = option_filter.power;
        data[opt].forEach((product, i) => {
            if(index === i){
                dispatch(selectProduct(product))
                // console.log(product)
            }
        });
        // console.log(data)
    };

    return (
        <div className="card">

             {
                (urlImage !== '') 
                    ? <img src={urlImage}/> 
                    : <img src={guante} alt="./assets/loading.gif" />
            } 

            <div className="text_content">
                <h5>{name}</h5>
                <p className="card_desc">{shortDescription}</p>
                <p className="card_desc"> <b>Price: ${ (prices?.length !== 0) ? prices[0].amount: '0.0' }</b></p>
                <p className="card_desc">Category: <u>{category}</u></p>
                <p className="" style={{color:'red'}}>PcID: <b>{pcId}</b></p>
                <p className="" style={{color:'green'}}>Index: <b>{index}</b></p>
                <p className="" style={{color:'blue'}}>sku: <b>{prices[0]?.sku}</b></p>
                
            </div>

            <div className="container_btn">
                <button onClick={()=>{handleMoreDetails(index)}}>More details</button>
                <button>Other options</button>
            </div>

        </div>
    )
}
