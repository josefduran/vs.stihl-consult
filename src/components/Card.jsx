import React from 'react'

export const Card = ({ model, img, category, power, size, profile, tags }) => {
    return (
        <div className="card">

            {
                (img) && <img src={`../../assets/img_products/${img}`} alt={img} />
            }

            <div className="text_content">
                <h2 className="card_title">{model}</h2>

                <p className="card_desc"><b>{profile}</b>-<span style={{color:'red'}}>{power}</span>-<b>{size}</b>-{tags}</p>
                <p className="card_desc"><u>{category}</u></p>
            </div>

            <div className="container_btn">
                <button>More details</button>
                <button>Other options</button>
            </div>

        </div>
    )
}
