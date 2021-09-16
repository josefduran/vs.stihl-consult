
import { useRoutebyHome } from '../../hook/useRoutebyHome';


import { useFetchproducts } from '../../helper/fetch_products';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, setLoading, setOtherProducts } from '../../redux/actions/actionProducts';
import { Loader } from '../Loader';
import { useEffect } from 'react';
import { type } from '../../redux/types/types';

// const home = 'https://i.ibb.co/h1y2BH4/home.png'
const home = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1631557732/house_pbysbx.png'
const home_less = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1631558096/small_ozrsqf.png'
const home_small = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1631558096/small-s_g3b68i.png'
const marcador =  "https://res.cloudinary.com/ddeguj0jq/image/upload/v1631558096/place_uywov3.png"
const logo = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1630705467/logo_mrx3fr.png';

export const HomePage = () => {
    const { handleClickGoSearch } = useRoutebyHome();
    //start fetching data 
    const { data: products, loading, error,otherOptions } = useSelector(state => state.products)
    const dispatch = useDispatch();
    const { mainScript } = useFetchproducts();

    useEffect(() => {
        dispatch(selectProduct({}))
        localStorage.removeItem("product");
        localStorage.removeItem("optionProducts");

        const executeMainScript = async () => {
            dispatch(setLoading(type.starLoading));
            await mainScript();
        }
        if( Object.keys(products).length === 0){
            executeMainScript();
        }
        if(otherOptions.length !== 0) dispatch(setOtherProducts([]));

    }, [])

    return (
        <div className="hp_background">
            <label className="hp_label">NEW!</label>
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
