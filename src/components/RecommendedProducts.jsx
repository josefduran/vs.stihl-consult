
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
import { OtherOptions } from './otherOptions/otherOptions'
import { addProductToCar } from '../redux/actions/actionCar'

export const RecommendedProducts = () => {

    const dispatch = useDispatch();

    const [cards, setCards] = useState([]);
    const { data: products, loading, error, otherOptions } = useSelector(state => state.products)
    const option_filter = useSelector(state => state.filter);
    const { car } = useSelector(state => state.car);

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

                let vegetation = option_filter.vegetation;

                let newArr = [];

                products.forEach(element => {
                    (element?.power) && newArr.push(element)
                });

                let newArrFiltered = []

                if (option_filter.power === "none") {
                    newArrFiltered = newArr

                } else {

                    const powerNone = newArr.filter(product => product.power === "none");

                    let arrFiltered = []
                    
                    if (Array.isArray(vegetation) && vegetation?.length !== 0) {

                        let vegArr = []
                        //or
                        vegetation.forEach( arr => {
                            newArr.forEach( product => {
                                if( product.tags.includes(arr) ) { vegArr.push(product) }
                            });
                        })

                        //and
                        // newArr.forEach( product => {
                            
                        //     let c = 0;
                        //     for (let i = 0; i < vegetation.length; i++) {
                        //         if( product.tags.includes(vegetation[i]) ) { c = c + 1; }
                        //     }
                        //     if( c === vegetation.length){ vegArr.push(product); }
                        //     c = 0; 
                        // });

                        let arrTest = []

                        vegArr.forEach( arr => {

                            if(arr.power === option_filter.power && arr.lawnSize === size){
                                arrTest.push(arr)
                            }
                        })

                        // arrFiltered = newArr.filter(product =>
                        //     product.power === option_filter.power &&
                        //     product.tags.includes(...vegetation) &&
                        //     product.lawnSize === size
                        // );

                        arrFiltered = arrTest

                    } else {

                        arrFiltered = newArr.filter(product =>
                            product.power === option_filter.power &&
                            product.lawnSize === size
                        );
                    }

                    newArrFiltered = [...new Set([...arrFiltered, ...powerNone])]

                }
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

    useEffect(() => {
        if (cards.length !== 0) {
            if (car.length === 0) {
                dispatch(addProductToCar(cards))
            }
        }
    }, [cards])


    return (
        <div className="rp_container">

            {
                (error)
                    ? <b className="error_center">Error en el server, no hay data</b>
                    : (otherOptions?.length !== 0)
                        ? <OtherOptions />
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
