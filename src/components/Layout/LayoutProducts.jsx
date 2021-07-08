import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../redux/store/store'
import { AsideAddress } from '../AsideAddress'
import { RecommendedProducts } from '../RecommendedProducts'


export const LayoutProducts = () => {
    return (
        <div>
            <AsideAddress />

            <Provider store={store}>
                <RecommendedProducts />
            </Provider>

        </div>
    )
}
