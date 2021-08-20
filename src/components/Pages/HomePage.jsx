
import { useRoutebyHome } from '../../hook/useRoutebyHome';

import home from '../../assets/home.png'
import marcador from "../../assets/marcador-de-posicion.png"
import { useFetchproducts } from '../../helper/fetch_products';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/actions/actionProducts';
import { Loader } from '../Loader';
import { useEffect } from 'react';
import { type } from '../../redux/types/types';

export const HomePage = () => {

    const { handleClickGoSearch } = useRoutebyHome();
    //start fetching data 
    const { data: products, loading, error } = useSelector(state => state.products)
    const dispatch = useDispatch();
    const { mainScript } = useFetchproducts();

    useEffect(() => {
        const executeMainScript = async () => {
            dispatch(setLoading(type.starLoading));
            await mainScript();
        }
        const isDataExist = (products?.battery?.length !== 0 || products?.electric?.length !== 0 || products?.gas?.length !== 0 || products?.others?.length !== 0) ? true : false;

        (!isDataExist) && executeMainScript();

    }, [])

    return (
        <div className="hp_background">
            <label className="hp_label">Lorem</label>
            <div className="hp_container_text">
                <h1 className="hp_title">Build your lawn care bundle</h1>
                <p className="hp_subtitle">Use our simple tool to find the perfect set of yard tools for your yard</p>
            </div>

            <div className="hp_container_cards">
                {
                    (loading)
                        ? <><Loader /></>
                        : (error)
                            ? <b className="no_products" style={{ color: 'white' }}>Error en el servidor</b>
                            : <>
                                <div className="hp_card" onClick={() => handleClickGoSearch("+1 acre")}>
                                    <img src={home} alt="home.png" />
                                    <p>+1 acre</p>
                                </div>
                                <div className="hp_card" onClick={() => handleClickGoSearch("-1 acre")}>
                                    <img src={home} alt="home.png" />
                                    <p>-1 acre</p>
                                </div>
                                <div className="hp_card" onClick={() => handleClickGoSearch("small yard")}>
                                    <img src={home} alt="home.png" />
                                    <p>small yard</p>
                                </div>
                                <div className="hp_card" onClick={() => handleClickGoSearch("search")}>
                                    <img src={marcador} alt="marcador.png" />
                                    <p>use my address</p>
                                </div>
                            </>
                }
            </div>

            <div className="hp_logo logo media_logo">
                <p>EDGE</p>
            </div>
        </div>
    )
}
