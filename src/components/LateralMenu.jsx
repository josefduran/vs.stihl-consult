import React from 'react'
import { useHistory } from 'react-router';
export const LateralMenu = () => {
    const history = useHistory();

    const handleClick = (option) => {        
        history.push(`/${option}`)
    };
    return (
        <div className="lm_container_menu">
            <div className="lm_container_items">
                <img src="../../assets/house.png"  alt="house.png" onClick={ ()=> handleClick("index")}/>
                <img src="../../assets/arrows.png"  alt="arrows.png" onClick={ ()=> handleClick("index")} />
                <img src="../../assets/card.png"  alt="card.png" />
                <img src="../../assets/lupa_.png"  alt="lupa_.png" onClick={ ()=> handleClick("search")}/>
            </div>
        </div>
    )
}
