import React from 'react'
import { useSelector } from 'react-redux'

import guante from '../assets/guantes.jpg'

export const Card = ({ prices=[],features=[],shortDescription="",name="",category="",pcId="" }) => {
    const { pathImg } = useSelector(state => state.products);
    // var element = prices[0].sku;
    // var idx = array.indexOf(element);
    var imgpath = '' 
    // console.log(array);
    // console.log(indices);
    console.log(pathImg[0]);
    console.log(prices[0].sku);
    var x = []; 
    for (x of pathImg) {
        console.log(x);
        if(x.indexOf(`http://us04-arbo-rc.vs-networks.com:8000/images/${prices[0].sku}`) == 0)
        {
            imgpath = x;
        }
    }
    return (
        <div className="card">

            {/* {
                (features?.length !== 0) 
                    ? <img src={`${features[0].imageProcessUrl}`}  alt={`${features[0].imageProcessUrl}`}/> 
                    : <img src={guante} alt="./assets/carta.png" />
            } */}
            <img src={imgpath} />
            <div className="text_content">
                <h5>{name}</h5>
                <p className="card_desc">{shortDescription}</p>
                <p className="card_desc"> <b>Price: ${ (prices?.length !== 0) ? prices[0].amount: '0.0' }</b></p>
                <p className="card_desc">Category: <u>{category}</u></p>
                <p className="" style={{color:'red'}}>PcID: <b>{pcId}</b></p>
                <p className="" style={{color:'blue'}}>SKU: <b>{prices[0].sku}</b></p>
            </div>

            <div className="container_btn">
                <button>More details</button>
                <button>Other options</button>
            </div>

        </div>
    )
}
