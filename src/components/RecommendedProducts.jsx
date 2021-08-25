
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
import { OtherOptions } from './otherOptions/otherOptions'

export const RecommendedProducts = () => {

    const dispatch = useDispatch();

    const [cards, setCards] = useState([]);
    const { data: products, loading, productSelected, error, otherOptions } = useSelector(state => state.products)
    const option_filter = useSelector(state => state.filter);
    const { mainScript } = useFetchproducts();

    useEffect(() => {
        if (Object.keys(products).length !== 0 && !error) {
            dispatch(setLoading(type.starLoading))
            setTimeout(() => {

                if (!option_filter?.frequent || !option_filter?.vegetation || !option_filter?.power) {
                    dispatch(setLoading(type.endLoading));
                    return
                };

                let size = "";
                switch (option_filter.frequent) {
                    case "infrequent": size = "<1"; break;
                    case "frequent": size = "Small Yard"; break;
                    case "constant": size = ">1"; break;
                }

                let vegetation = (option_filter.vegetation === "light") ? "small" : option_filter.vegetation;
                let newArr = [];
                products.forEach(element => {
                    (element?.power) && newArr.push(element)
                });

                const newArrFiltered = products.filter(product =>
                    product.power === option_filter.power &&
                    product.tags.toLocaleLowerCase().includes(vegetation.toLocaleLowerCase()) &&
                    product.lawnSize === size
                );


                setCards(newArrFiltered);



                dispatch(setLoading(type.endLoading))
            }, 200);
        } else {

            const executeMainScript = async () => {
                dispatch(setLoading(type.starLoading));
                await mainScript();
            }
            executeMainScript();
        }

    }, [products, option_filter])


    return (
        <div className="rp_container">
            {
                (error)
                    ? <b className="error_center">Error en el server, no hay data</b>
                    : (Object.keys(productSelected).length !== 0)
                        ? <ProductSelected productSelected={productSelected} />
                        : (otherOptions?.length !== 0) ? <OtherOptions />
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
                                                ? <b className="no_products">No products, select another filter</b>
                                                : cards.map((product, index) => (
                                                    (product?.power) && <Card key={index} productOnly={product} />
                                                ))
                                    }
                                </div>
                            </>
            }

        </div>
    )
}
