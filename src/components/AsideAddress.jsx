import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { img_paths } from '../data/img';
import { useMapFullScreen } from '../hook/useMapFullScreen';
import { useRoutebyHome } from '../hook/useRoutebyHome';
import { changeStateModal } from '../redux/actions/actionCar';
import { locationSelected } from '../redux/actions/actionLocation';
import { Modal } from './Modal';

const { logo, carta, marcador_card_orange, home, home_less, home_small } = img_paths;

export const AsideAddress = () => {

    const initialState = sessionStorage.getItem('gisacre');
    const [gisacre, setGisacre] = useState((initialState) ? initialState : '');
    const [checkedAcre, setCheckedAcre] = useState("none");

    const dataLocation = useSelector(state => state.location);

    const option_filter = useSelector(state => state.filter);
    const { modal } = useSelector(state => state.car);
    const dispatch = useDispatch();

    const { handleClickGoSearch } = useRoutebyHome();
    const { mapFullScreen, handleOpenMap } = useMapFullScreen();


    const isMonted = useRef(true);

    let location = "";
    let img_card = "";
    let subtitle = "";

    switch (dataLocation.address) {
        case "+1 acre": location = "Large"; img_card = home; subtitle = "MORE THAN AN ACRE"
            break;
        case "-1 acre": location = "Medium"; img_card = home_less; subtitle = "LESS THAN AN ACRE"
            break;
        case "small yard": location = "Small"; img_card = home_small; subtitle = "LESS THAN AN ACRE"
            break;
        default: location = dataLocation.address
            break;
    }

    const handleSendEmail = () => {
        dispatch(changeStateModal(true))
    };



    useEffect(() => {

        const fetchingAcrees = async () => {
            const host = "https://app.regrid.com/api/v1/search.json"
            const key = process.env.REACT_APP_KEY_LANDGRID;
            const nearest = '1';
            const radius = '263.19306619490214'
            const limit = '1'

            const url = `${host}?lat=${dataLocation.lat}&lon=${dataLocation.lng}&nearest=${nearest}&radius=${radius}&limit=${limit}&token=${key}`
            const existGisAcre = sessionStorage.getItem('gisacre');

            if (!existGisAcre) {
                console.log('ejecucion de la api')
                const response = await fetch(url);
                const dataResponse = await response.json();
                if (dataResponse.status === "error") {
                    sessionStorage.setItem('gisacre', "No results");
                    setGisacre(dataResponse.message)
                } else {
                    if (dataResponse.results[0]?.properties?.fields?.ll_gisacre) {
                        const gisacreValue = dataResponse.results[0].properties.fields.ll_gisacre;
                        sessionStorage.setItem('gisacre', gisacreValue);
                        setGisacre(gisacreValue);

                        evalueteQuiantityAcres(gisacreValue)

                    } else {
                        sessionStorage.setItem('gisacre', "No results");
                        setGisacre("No results")
                        evalueteQuiantityAcres("No results")
                    }
                }

            }
        };

        if (isMonted && dataLocation.lat && dataLocation.lng && (gisacre === '' || gisacre === null)) {

            fetchingAcrees()
        }

    }, [])

    useEffect(() => {

        if (option_filter.frequent && dataLocation.lat && dataLocation.lng) {

            switch (option_filter.frequent) {
                case 'infrequent': setCheckedAcre("Small"); handleClickGoSearch("small yard", false); break;
                case 'frequent': setCheckedAcre("Medium"); handleClickGoSearch("-1 acre", false); break;
                case 'constant': setCheckedAcre("Large"); handleClickGoSearch("+1 acre", false); break;
                default: break;
            }
        }

    }, [option_filter.frequent])

    const evalueteQuiantityAcres = (acres) => {
        if (acres >= 1) handleClickGoSearch("+1 acre", false);
        else if (acres <= 0.99 && acres >= 0.34) handleClickGoSearch("-1 acre", false);
        else if (acres <= 0.33 && acres >= 0.01) handleClickGoSearch("small yard", false);
        else if (acres === "No results") handleClickGoSearch("small yard", false);
    };

    useEffect(() => {
        return () => {
            isMonted.current = false;
            sessionStorage.removeItem('gisacre');
        }
    }, [])


    const typeSizeAsidee = () => {
        let image;
        let size;
        switch (option_filter.frequent) {
            case 'infrequent': size = 'Small Yard'; image = home_small; break;
            case 'frequent': size = 'Medium'; image = home_less; break;
            case 'constant': size = 'Large'; image = home; break;
            default: break;
        }

        return { image, size }
    };
    console.log({gisacre})
    return (
        <>
            {
                (modal) && <Modal />
            }
            <div className="aa_container">
                <div>
                    <header className="aa_header">
                        {
                            (!["Large", "Medium", "Small"].includes(location))
                                ? <>
                                    <h3><b>Your address</b></h3>
                                    <hr />
                                    <h4>{location}</h4>
                                    <hr />
                                    <h2>ACREAGE: {gisacre}</h2>
                                </>
                                : <>
                                    <h3 className="aa_title_type_acre"><b>{location} yard</b></h3>
                                    <h3 className="subtitle_type_acre">{subtitle}</h3>
                                    <hr className="separator_titles" />
                                </>
                        }
                    </header>

                    <div className={`aa_container_img ${(!dataLocation.lat || !dataLocation.lng) && 'py'}`} >
                        {
                            (  !dataLocation.lat || !dataLocation.lng )
                                ? <>
                                    <img src={typeSizeAsidee().image} alt="ubication_img" />
                                    <p className="aa_location">{typeSizeAsidee().size}</p>
                                </>

                                : <>
                                    {mapFullScreen()}
                                    <div className="aa_map" onClick={handleOpenMap}></div>
                                </>
                        }
                    </div>


                    {
                        (!dataLocation.lat || !dataLocation.lng)
                            ?
                            <>
                                <p className="aa_parrafo">Want more specific information related to your property? Use our address finder to get more in-depth recommendations.</p>
                                <Link to="/search" className="aa_btn_search" onClick={() => { sessionStorage.removeItem('full'); dispatch(locationSelected("")) }}>
                                    <img src={marcador_card_orange} alt={marcador_card_orange} />
                                    <p>Find my property</p>
                                </Link>
                            </>
                            : (!gisacre || gisacre === "No results") &&
                            <div className="grid_sizes">
                                <div>
                                    <input type="radio" id="small" name="typeSize" className="typeSize_radio" readOnly checked={(checkedAcre === "Small")}

                                    />
                                    <label htmlFor="small" className="container_typeSize" onClick={() => { handleClickGoSearch("small yard", false); setCheckedAcre("Small") }} >
                                        <img className="img_size" src={home_small} alt={home_small} />
                                        <p>small</p>
                                    </label>
                                </div>

                                <div>
                                    <input type="radio" id="less" name="typeSize" className="typeSize_radio" readOnly checked={(checkedAcre === "Medium")}

                                    />
                                    <label htmlFor="less" className="container_typeSize" onClick={() => { handleClickGoSearch("-1 acre", false); setCheckedAcre("Medium") }} >
                                        <img className="img_size" src={home_less} alt={home_less} />
                                        <p>-1 acre</p>
                                    </label>
                                </div>

                                <div>
                                    <input type="radio" id="home" name="typeSize" className="typeSize_radio" readOnly checked={(checkedAcre === "Large")}

                                    />
                                    <label htmlFor="home" className="container_typeSize" onClick={() => { handleClickGoSearch("+1 acre", false); setCheckedAcre("Large") }} >
                                        <img className="img_size" src={home} alt={home} />
                                        <p>+1 acre</p>
                                    </label>
                                </div>
                            </div>
                    }
                </div>
                <div>
                    <footer className="aa_footer">
                        <div className="logo aa_logo">
                            <img src={logo} alt={logo} />
                        </div>
                        <button className="aa_btn_sendKit" onClick={handleSendEmail}>
                            <img src={carta} alt="" />
                            <p>Send me my kit</p>
                        </button>
                    </footer>
                </div>
            </div>
        </>
    )
}
