import React from 'react'
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelected } from '../redux/actions/actionFilter';
import { selectProduct } from '../redux/actions/actionProducts';


export const LateralMenu = () => {
    const house =  "https://i.ibb.co/zQP9kqy/house.png"
    const arrow =  "https://i.ibb.co/T2ws4YV/arrows.png"
    const lupa =  "https://i.ibb.co/MkVR51R/lupa.png"
    const card =  "https://i.ibb.co/D84rLpW/card.png"
    const history = useHistory();
    const dispatch = useDispatch();
    const { productSelected } = useSelector(state => state.products)
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
                if (Object.keys(productSelected).length !== 0) {
                    dispatch(selectProduct({}))
                    localStorage.removeItem("product");
                } else {
                    history.push(`/${optionRoute}`);
                }
        }
    };

    const doDispatch = (productSelected, typePower = "", typeSize = "", typeVegetation = "") => {

        if (Object.keys(productSelected).length !== 0) {
            dispatch(selectProduct({}))
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
                <img src={card} alt="card.png" onClick={() => handleClick("options2")} />
                <img src={lupa} alt="lupa_.png" onClick={() => handleClick("search")} />
            </div>
        </div>
    )
}
