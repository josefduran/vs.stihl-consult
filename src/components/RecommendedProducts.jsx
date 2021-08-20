
import { Card } from './Card'
import { VegetationOptions } from './VegetationOptions'

// import { products } from '../helper/data_products'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PowerOptions } from './PowerOptions'
import { FrecuentOptions } from './FrecuentOptions'
import { Loader } from './Loader'
import { useFetchproducts } from '../helper/fetch_products'
import { setLoading } from '../redux/actions/actionProducts'
import { type } from '../redux/types/types'
import { ProductSelected } from './ProductSelected'

export const RecommendedProducts = () => {

    const dispatch = useDispatch();

    const [cards, setCards] = useState([]);
    const { data: products, loading, productSelected, error } = useSelector(state => state.products)
    const option_filter = useSelector(state => state.filter);

    useEffect(() => {

        if (products.length !== 0 && !error) {
            dispatch(setLoading(type.starLoading))
            setTimeout(() => {
                setCards(products[option_filter.power]);
                dispatch(setLoading(type.endLoading))
            }, 500);
        }

    }, [products, option_filter])


    return (
        <div className="rp_container">
            {
                (error)
                ?<b className="error_center">Error en el server, no hay data</b>
                :(Object.keys(productSelected).length !== 0)
                    ? <ProductSelected {...productSelected} />
                    : <>
                        <h2 className="rp_subtitle">You're an outdoor boss</h2>

                        <div className="">
                            <PowerOptions />
                            <FrecuentOptions />
                            <VegetationOptions />
                        </div>

                        <div className="container_cards">
                            {
                                (loading)
                                    ? <Loader />
                                    : (cards.length === 0)
                                        ? <b className="no_products">No products</b>
                                        : cards.map((product, index) => <Card key={index} {...product} index={index} />)
                            }
                        </div>
                    </>
            }

        </div>
    )
}
