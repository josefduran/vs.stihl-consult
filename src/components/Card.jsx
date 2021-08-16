import React from 'react'

import guante from '../assets/guantes.jpg'

export const Card = ({ prices=[],features=[],shortDescription="",name="",category="",pcId="" }) => {
    
    return (
        <div className="card">

            {
                (features?.length !== 0) 
                    ? <img src={`${features[0].imageProcessUrl}`}  alt={`${features[0].imageProcessUrl}`}/> 
                    : <img src={guante} alt="./assets/carta.png" />
            }
            
            <div className="text_content">
                <h5>{name}</h5>
                <p className="card_desc">{shortDescription}</p>
                <p className="card_desc"> <b>Price: ${ (prices?.length !== 0) ? prices[0].amount: '0.0' }</b></p>
                <p className="card_desc">Category: <u>{category}</u></p>
                <p className="" style={{color:'red'}}>PcID: <b>{pcId}</b></p>
            </div>

            <div className="container_btn">
                <button>More details</button>
                <button>Other options</button>
            </div>

        </div>
    )
}
