import React from 'react'

export const Card = ({ prices=[],features=[],shortDescription="",name="",category="" }) => {
    
    return (
        <div className="card">

            {
                (features?.length !== 0) ? <img src={`${features[0].imageProcessUrl}`}  /> : <img src="./assets/carta.png"  />
            }
            
            <div className="text_content">
                <h5>{name}</h5>
                <p className="card_desc">{shortDescription}</p>
                <p className="card_desc"> <b>Price: ${ (prices?.length !== 0) ? prices[0].amount: '0.0' }</b></p>
                <p className="card_desc">Category: <u>{category}</u></p>
            </div>

            <div className="container_btn">
                <button>More details</button>
                <button>Other options</button>
            </div>

        </div>
    )
}
