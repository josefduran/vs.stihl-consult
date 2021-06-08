import React from 'react'
import { AsideAddress } from './Pages/AsideAddress'
import {  RecommendedProducts } from './Pages/RecommendedProducts'


export const LayoutProducts = () => {
    return (
        <div className="LP_container_main">
           <AsideAddress/>
           <RecommendedProducts/> 
        </div>
    )
}
