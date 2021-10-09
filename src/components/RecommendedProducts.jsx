
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
import { addProductToCar, addProductToTrash } from '../redux/actions/actionCar'




export const RecommendedProducts = () => {

    const dispatch = useDispatch();

    const [cards, setCards] = useState([]);
    // const [cardsNone, setCardsNone] = useState([]);
    const [profile, setProfile] = useState("an outdoor boss")

    const { data: products, loading, error, otherOptions } = useSelector(state => state.products)
    const option_filter = useSelector(state => state.filter);
    const { car, trash } = useSelector(state => state.car);

    const { mainScript } = useFetchproducts();

    useEffect(() => {
        if (Object.keys(products).length !== 0 && !error) {
            dispatch(setLoading(type.starLoading))
            setTimeout(() => {

                if (!option_filter?.frequent || !option_filter?.vegetation || !option_filter?.power) {
                    dispatch(setLoading(type.endLoading));
                    return
                };

                const carStorage = JSON.parse(localStorage.getItem("car"));
                const trashStorage = JSON.parse(localStorage.getItem("trash"));
                if(carStorage?.length !== 0){
                    console.log({carStorage,trashStorage})
                    dispatch(setLoading(type.endLoading));
                    dispatch(addProductToCar(carStorage))  
                    dispatch(addProductToTrash(trashStorage));
                    return;  
                }

                let size = "";
                switch (option_filter.frequent) {
                    case "infrequent": size = "Small Yard"; break;
                    case "frequent": size = "<1"; break;
                    case "constant": size = ">1"; break;
                }

                let vegetation = option_filter.vegetation;

                let newArr = [];
                let powerNone = [];
                products.forEach(element => {
                    (element?.power) && newArr.push(element)
                });

                let newArrFiltered = []
                let vegArr = []

                if (option_filter.power === "none") {

                    newArrFiltered = newArr;

                } else {

                    let arrFiltered = []

                    if (Array.isArray(vegetation) && vegetation?.length !== 0) {

                        vegetation.forEach(arr => {
                            newArr.forEach(product => {
                                if (product.tags.includes(arr)) { vegArr.push(product) }
                            });
                        })

                        let arrTest = [];

                        vegArr.forEach(arr => {

                            if (arr.power === option_filter.power && arr.lawnSize === size) {
                                arrTest.push(arr)
                            }
                        })
                        arrFiltered = arrTest

                    } else {

                        arrFiltered = newArr.filter(product =>
                            product.power === option_filter.power &&
                            product.lawnSize === size
                        );
                    }

                    let productsRecommended = [], productsOptions = [];

                    [...new Set(arrFiltered)].forEach(arrCategory => {
                        let words = arrCategory.category.split(" ");
                        let keyword = words.length === 1 ? words[0] : words[words.length - 1];

                        (productsRecommended.find(product => product.category.includes(keyword)))
                            ? productsOptions.push(arrCategory)
                            : productsRecommended.push(arrCategory);

                    })

                    // console.log({arr: [...new Set(arrFiltered)], productsOptions, productsRecommended})


                    // if (car.length === 0) {
                    //     console.log('car length = 0')
                        newArrFiltered = [...productsRecommended];
                    // } else {
                    //     console.log('car length != 0');
                    //     console.log({ car })
                    //     newArrFiltered = [...car];
                    // }
                }

                setCards(newArrFiltered);

                if (Object.keys(products).length !== 0 && !error) {
                    products.forEach(element => {
                        (element?.power && element?.power === "none") && powerNone.push(element)
                    });
                }

                dispatch(addProductToTrash(powerNone));

                if (option_filter.power !== 'none') dispatch(addProductToCar(newArrFiltered));

                dispatch(setLoading(type.endLoading));

            }, 100);

        } else {

            const executeMainScript = async () => {
                dispatch(setLoading(type.starLoading));
                await mainScript();
            }
            executeMainScript();
        }

    }, [products, option_filter])


    useEffect(() => {

        switch (option_filter.frequent) {
            case "infrequent": setProfile("a Backyard Champ"); break;
            case "frequent": setProfile("an Outdoor Boss"); break;
            case "constant": setProfile("a Property Master"); break;
        }

    }, [option_filter.frequent])

    return (
        <div className="rp_container">

            {
                (error)
                    ? <b className="error_center">Error en el server, no hay data</b>
                    : (otherOptions?.length !== 0)
                        ? <OtherOptions />
                        : <>
                            <h2 className="rp_subtitle">YOU'RE {profile}</h2>

                            <div className="">
                                <PowerOptions />
                                <FrecuentOptions />
                                <VegetationOptions />
                            </div>

                            <div >
                                {
                                    (loading)
                                        ? <Loader />
                                        : (car.length === 0 && option_filter.power !== "none")
                                            ? <b className="no_products">No products, select another filter</b>
                                            : (option_filter.power !== "none")
                                                ?
                                                <div className="container_cards">
                                                    {
                                                        car.map((product, index) => (
                                                            (product?.power) && <Card key={index} productOnly={product} />
                                                        ))
                                                    }
                                                </div>
                                                :
                                                <div className="container_cards">
                                                    {
                                                        cards.map((product, index) => (
                                                            (product?.power) && <Card key={index} productOnly={product} />
                                                        ))
                                                    }
                                                </div>

                                }
                                {
                                    // (cardsNone.length !== 0)
                                    (trash.length !== 0)
                                    &&
                                    <>
                                        <div className="container_saparator">
                                            <b className="rp_subtitle_separator">Other Suggested Products</b>
                                            <hr />
                                        </div>
                                        <div className="container_cards">
                                            {
                                                // cardsNone.map((product, index) => (
                                                //     (product?.power) && <Card key={index} productOnly={product} />
                                                // ))
                                                trash.map((product, index) => (
                                                    (product?.power) && <Card key={index} productOnly={product} />
                                                ))
                                            }
                                        </div>
                                    </>
                                }
                            </div>
                        </>
            }

        </div>
    )
}
