import React from 'react'
// import { Provider } from 'react-redux'
// import { store } from '../../redux/store/store'
import { useHistory } from 'react-router-dom'
import { AsideAddress } from '../AsideAddress'
import { OptionsTwo } from '../Pages/OptionsTwo'
import { RecommendedProducts } from '../RecommendedProducts'


export const LayoutProducts = () => {

    const { location:{pathname} }=useHistory();
    
    return (
        <div>
            

                {
                    (pathname === "/options2") ? <OptionsTwo/> : <><AsideAddress /><RecommendedProducts /></>
                }
                

        </div>
    )
}
