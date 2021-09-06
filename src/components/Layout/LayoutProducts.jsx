import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AsideAddress } from '../AsideAddress'
import { RecommendedProducts } from '../RecommendedProducts'


export const LayoutProducts = () => {


    const history = useHistory();
    const {address} = useSelector(state => state.location);
    const filterState = useSelector(state => state.filter);

    useEffect(() => {
        const newObj = {address, ...filterState};
        let flat = false;
        for (const data in newObj) {
            if (Object.hasOwnProperty.call(newObj, data)) {
                if(!newObj[data]){
                    flat =true;
                }
            }
        }
        (flat) && history.replace("/")

    }, [])

    return (
        <div>
            <AsideAddress />
            <RecommendedProducts />
        </div>
    )
}
