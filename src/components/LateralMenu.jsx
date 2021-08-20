import React from 'react'
import { useHistory } from 'react-router';

import house from "../assets/house.png"
import arrow  from "../assets/arrows.png"
import lupa from "../assets/lupa_.png"
import card from "../assets/card.png"


export const LateralMenu = () => {
    const history = useHistory();

    const handleClick = (option) => {        
        history.push(`/${option}`)
    };
    return (
        <div className="lm_container_menu">
            <div className="lm_container_items">
                <img src={house}  alt="house.png" onClick={ ()=> handleClick("index")}/>
                <img src={arrow}  alt="arrows.png" onClick={ ()=> handleClick("index")} />
                <img src={card}  alt="card.png" onClick={ ()=> handleClick("options2")}/>
                <img src={lupa}  alt="lupa_.png" onClick={ ()=> handleClick("search")}/>
            </div>
        </div>
    )
}
