
import { useRoutebyHome } from '../../hook/useRoutebyHome';


import { useFetchproducts } from '../../helper/fetch_products';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, setLoading, setOtherProducts } from '../../redux/actions/actionProducts';
import { Loader } from '../Loader';
import { useEffect } from 'react';
import { type } from '../../redux/types/types';
import { img_paths } from '../../data/img';
import { locationSelected } from '../../redux/actions/actionLocation';
import { addProductToCar, addProductToTrash } from '../../redux/actions/actionCar';

const { home, home_less, home_small, marcador, logo } = img_paths

export const HomePage = () => {
    const { handleClickGoSearch } = useRoutebyHome();
    //start fetching data 
    const { data: products, loading, error, otherOptions } = useSelector(state => state.products)
    const dispatch = useDispatch();
    const { mainScript } = useFetchproducts();

    useEffect(() => {

        dispatch(locationSelected(""));
        dispatch(selectProduct({}))
        dispatch(addProductToCar([]))
        dispatch(addProductToTrash([]))
        localStorage.removeItem("product");
        localStorage.removeItem("optionProducts");

        const executeMainScript = async () => {
            dispatch(setLoading(type.starLoading));
            await mainScript();
        }
        if (Object.keys(products).length === 0) {
            executeMainScript();
        }
        if (otherOptions.length !== 0) dispatch(setOtherProducts([]));

    }, [])

    return (
        <div className="hp_background">
            {/* <label className="hp_label">NEW!</label> */}
            <div>
                <div className="hp_img_container">
                    <img src={logo} alt={logo} />
                </div>
                <div className="hp_container_text">
                    <h1 className="hp_title">Build Your Ultimate Lawn Care Kit</h1>
                    <p className="hp_subtitle">Get started to customize the perfect set of tools for <b>your</b> yard</p>
                </div>
            </div>

            <div className="hp_container_cards">
                {
                    (loading)
                        ? <><Loader /></>
                        : (error)
                            ? <b className="no_products" style={{ color: 'white' }}>Error en el servidor</b>
                            : <>
                                <div className="hp_card card_address" onClick={() => handleClickGoSearch("search")}>
                                    <img src={marcador} alt="marcador.png" />
                                    <p>use my address</p>
                                </div>

                                <div className="hp_card" onClick={() => handleClickGoSearch("small yard")}>
                                    <img src={home_small} alt="home.png" />
                                    <p>small yard</p>
                                </div>

                                <div className="hp_card" onClick={() => handleClickGoSearch("-1 acre")}>
                                    <img src={home_less} alt="home.png" />
                                    <p>-1 acre</p>
                                </div>
                                <div className="hp_card" onClick={() => handleClickGoSearch("+1 acre")}>
                                    <img src={home} alt="home.png" />
                                    <p>+1 acre</p>
                                </div>

                            </>
                }
            </div>

            <div className="hp_logo media_logo">
                {/* <p>EDGE</p> */}
                <img src={logo} alt={logo} />
            </div>
        </div>
    )
}
