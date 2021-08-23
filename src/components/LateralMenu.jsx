import React from 'react'
import { useHistory } from 'react-router';

import house from "../assets/house.png"
import arrow  from "../assets/arrows.png"
import lupa from "../assets/lupa_.png"
import card from "../assets/card.png"
import { useDispatch, useSelector } from 'react-redux';
import { filterSelected } from '../redux/actions/actionFilter';
import { selectProduct } from '../redux/actions/actionProducts';


export const LateralMenu = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { productSelected } = useSelector(state => state.products)
    const {address} = useSelector(state => state.location);
    const { power,frequent,vegetation } = useSelector(state => state.filter);

    const handleClick = (optionRoute, isGoBack=false) => {  
        
        if(isGoBack && history.location.pathname === "/options") backLocation(address);
        else history.push(`/${optionRoute}`);
    };

    const backLocation = (address="") => {
        console.log(address)
        switch (address) {
            case "+1 acre": doDispatch(productSelected,"electric","constant","heavy"); break;
            case "-1 acre": doDispatch(productSelected,"electric","infrequent","medium"); break;
            case "small yard": doDispatch(productSelected,"electric","frequent","light"); break;
            default: history.push(`/${optionRoute}`);
        }
    };

    const doDispatch= (productSelected,typePower="",typeSize="",typeVegetation="") => {

        if(Object.keys(productSelected).length !== 0){
            dispatch(selectProduct({}))
            localStorage.removeItem("product");
        }else{
            if(typePower!==power || typeSize !== frequent || vegetation !== typeVegetation){
                dispatch(filterSelected(typePower,typeSize,typeVegetation))
            }else{
                history.push(`/index`);
            }
        }
    };

    return (
        <div className="lm_container_menu">
            <div className="lm_container_items">
                <img src={house}  alt="house.png" onClick={ ()=> handleClick("index")}/>
                <img src={arrow}  alt="arrows.png" onClick={ ()=> handleClick("index",true)} />
                <img src={card}  alt="card.png" onClick={ ()=> handleClick("options2")}/>
                <img src={lupa}  alt="lupa_.png" onClick={ ()=> handleClick("search")}/>
            </div>
        </div>
    )
}
