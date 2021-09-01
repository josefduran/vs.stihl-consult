import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelected } from '../redux/actions/actionFilter';
import { selectProduct, setOtherProducts } from '../redux/actions/actionProducts';
import { Modal } from './Modal';

const house =  "https://i.ibb.co/zQP9kqy/house.png"
const arrow =  "https://i.ibb.co/T2ws4YV/arrows.png"
const lupa =  "https://i.ibb.co/MkVR51R/lupa.png"
const card =  "https://i.ibb.co/D84rLpW/card.png"

export const LateralMenu = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { productSelected,otherOptions } = useSelector(state => state.products)
    const { address } = useSelector(state => state.location);
    const { power, frequent, vegetation } = useSelector(state => state.filter);
    

    const handleClick = (optionRoute, isGoBack = false) => {
        if (isGoBack && history.location.pathname === "/options") backLocation(address, optionRoute);
        else history.push(`/${optionRoute}`);
    };

    const backLocation = (address = "", optionRoute) => {
        switch (address) {
            case "+1 acre": doDispatch(productSelected, "electric", "constant", "heavy"); break;
            case "-1 acre": doDispatch(productSelected, "electric", "infrequent", "medium"); break;
            case "small yard": doDispatch(productSelected, "electric", "frequent", "light"); break;
            default:
                
                if (Object.keys(productSelected).length !== 0 || otherOptions.length !== 0) {
                    dispatch(setOtherProducts([]));
                    dispatch(selectProduct({}))
                    localStorage.removeItem("product");
                } else {
                    history.push(`/${optionRoute}`);
                }
        }
    };

    const doDispatch = (productSelected, typePower = "", typeSize = "", typeVegetation = "") => {

        if (Object.keys(productSelected).length !== 0 || otherOptions.length !== 0) {
            dispatch(selectProduct({}))
            dispatch(setOtherProducts([]));
            localStorage.removeItem("product");
        } else {
            if (typePower !== power || typeSize !== frequent || vegetation !== typeVegetation) {
                dispatch(filterSelected(typePower, typeSize, typeVegetation))
            } else {
                history.push(`/index`);
            }
        }
    };

    
    return (
        <div className="lm_container_menu">
            
            <div className="lm_container_items">
                <img src={house} alt="house.png" onClick={() => handleClick("index")} />
                <img src={arrow} alt="arrows.png" onClick={() => handleClick("index", true)} />
                <img src={card} alt="card.png" />
                <img src={lupa} alt="lupa_.png" onClick={() => handleClick("search")} />
            </div>
        </div>
    )
}
