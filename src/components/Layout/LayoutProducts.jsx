import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useBackFilter } from '../../hook/useBackFilter'
import { AsideAddress } from '../AsideAddress'
import { OtherOptions } from '../otherOptions/otherOptions'
import { ProductSelected } from '../ProductSelected'
import { RecommendedProducts } from '../RecommendedProducts'


export const LayoutProducts = () => {


    const history = useHistory();
    const { address } = useSelector(state => state.location);
    const filterState = useSelector(state => state.filter);
    const { productSelected } = useSelector(state => state.products)
    const { handleClick } = useBackFilter();

    useEffect(() => {
        // const newObj = { address, ...filterState };

        // let flat = false;
        
        // for (const data in newObj) {
        //     if (Object.hasOwnProperty.call(newObj, data)) {
        //         if (!newObj[data]) {
        //             flat = true;
        //         }
        //     }
        // }

        (!address || address === '') && history.replace("/")

        const $scroll_container = document.querySelector('.scroll_container');
        if($scroll_container){
            $scroll_container.scrollTop = 0
        }

    }, [])

    return (
        <div className={`${((Object.keys(productSelected).length !== 0)) && 'scroll_container'}`}>
            {
                (Object.keys(productSelected).length !== 0)
                    ?
                    <div className="container_product_selected_options">
                        <div
                            className="header_product_selected"
                            onClick={() => handleClick("index", true)}
                        >
                            <p>TOUCH HERE TO FILTER YOUR RESULTS</p>
                        </div>
                        <ProductSelected productSelected={productSelected} />
                        <OtherOptions />
                    </div>
                    :
                    <>
                        <AsideAddress />
                        <RecommendedProducts />
                    </>
            }
        </div>
    )
}
