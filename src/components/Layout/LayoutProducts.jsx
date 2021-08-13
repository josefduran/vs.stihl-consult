import React from 'react'
import { Provider } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { store } from '../../redux/store/store'
import { AsideAddress } from '../AsideAddress'
import { OptionsTwo } from '../Pages/OptionsTwo'
import { RecommendedProducts } from '../RecommendedProducts'


export const LayoutProducts = () => {

    const { location:{pathname} }=useHistory();
    
    return (
        <div>
            

            <Provider store={store}>
                {
                    (pathname === "/options2") ? <OptionsTwo/> : <><AsideAddress /><RecommendedProducts /></>
                }
                
            </Provider>

        </div>
    )
}
