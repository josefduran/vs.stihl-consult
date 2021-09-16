import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { loadGoogleMapScript } from '../helper/loadGoogleMapScript';
import { changeStateModal } from '../redux/actions/actionCar';
import { filterSelected } from '../redux/actions/actionFilter';
import { Modal } from './Modal';


let location = "";
const carta = 'https://i.ibb.co/TMxMRc7/carta.png'
const marcador = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1631573984/marcador-de-posicion_eonhln.png'
const logo = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1630705467/logo_mrx3fr.png';


export const AsideAddress = () => {
    const initialState = sessionStorage.getItem('gisacre')
    const [gisacre, setGisacre] = useState((initialState) ? initialState : '')
    const dataLocation = useSelector(state => state.location);
    const { modal } = useSelector(state => state.car);
    const dispatch = useDispatch();

    const fullScreen = sessionStorage.getItem('full');
    const [isFullScreen, setIsFullScreen] = useState((fullScreen === "false") ? false : true)


    const isMonted = useRef(true);
    let home = "";

    switch (dataLocation.address) {
        case "+1 acre": location = "Large"; home = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1631557732/house_pbysbx.png'
            break;
        case "-1 acre": location = "Medium"; home = "https://res.cloudinary.com/ddeguj0jq/image/upload/v1631558096/small_ozrsqf.png"
            break;
        case "small yard": location = "Small"; home = "https://res.cloudinary.com/ddeguj0jq/image/upload/v1631558096/small-s_g3b68i.png"
            break;
        default: location = dataLocation.address
            break;
    }

    useEffect(() => {
        loadGoogleMapScript(() => {

            if (dataLocation.lat || dataLocation.lng) {

                function initMap() {
                    new window.google.maps.Map(document.getElementById("map"), {
                        center: { lat: dataLocation.lat, lng: dataLocation.lng },
                        zoom: 18,
                        mapTypeId: "satellite",
                        heading: 90,
                        tilt: 45,
                        disableDefaultUI: true,
                        mapTypeControl: false,
                        zoomControl: false
                    });
                }

                initMap();
            }
        });
    }, [dataLocation]);

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
                console.log(dataResponse)
                if (dataResponse.status === "error") {
                    sessionStorage.setItem('gisacre', "No results");
                    setGisacre(dataResponse.message)
                } else {
                    if (dataResponse.results[0]?.properties?.fields?.ll_gisacre) {
                        console.log('si hay acre')
                        const gisacreValue = dataResponse.results[0].properties.fields.ll_gisacre;
                        sessionStorage.setItem('gisacre', gisacreValue);
                        setGisacre(gisacreValue);
                        
                        evalueteQuiantityAcres(gisacreValue)

                    } else {
                        sessionStorage.setItem('gisacre', "No results");
                        setGisacre("No results")
                    }
                }

                dispatch(filterSelected("none", "constant", "heavy"))
            }
        };

        if (isMonted && dataLocation.lat && dataLocation.lng && (gisacre === '' || gisacre === null)) {

            fetchingAcrees()
            dispatch(filterSelected("none", "constant", "heavy"))
        }

    }, [])

    useEffect(() => {

        return () => {
            isMonted.current = false;
            sessionStorage.removeItem('gisacre');
        }
    }, [])

    useEffect(() => {

        if (isFullScreen) {
            setTimeout(() => {

                sessionStorage.setItem('full', "false");

                const $fullScreen = document.querySelector('.full-screen');
                const $mapFull = document.querySelector('.map-full');

                if ($fullScreen) {
                    $fullScreen.classList.add('animate__slideOutLeft');
                    $mapFull.classList.remove('animate__zoomIn')
                    setTimeout(() => {
                        $fullScreen.style.display = "none";
                        $fullScreen.classList.remove('animate__slideOutLeft');
                        setIsFullScreen(false);
                    }, 4000);
                }


            }, 3000);
        }

        return () => {
            setIsFullScreen(false);
        }
    }, [])

    const mapFullScreen = () => {

        return (isFullScreen) && <div className='full-screen animate__animated'>
            <span>Your address</span>
            <div className='map-full animate__animated animate__zoomIn'></div>
        </div>
    }

    const evalueteQuiantityAcres = (acres) => {
         if(acres > 1) dispatch(filterSelected("", "constant", ""))
         else if(acres < 0.99 && acres >0.34) dispatch(filterSelected("", "infrequent", ""))
         else if(acres < 0.33 && acres > 0.01) dispatch(filterSelected("", "frequent", ""))
    };

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
                                    <h3 className="subtitle_type_acre">LESS THAN AN ACRE</h3>
                                    <hr className="separator_titles" />
                                </>
                        }
                    </header>

                    <div className={`aa_container_img ${(!dataLocation.lat || !dataLocation.lng) && 'py'}`} >

                        {
                            (dataLocation.lat || dataLocation.lng)
                                ? <>
                                    {mapFullScreen()}
                                    <div id="map" className="aa_map"></div>
                                </>

                                : <>
                                    <img src={home} alt="ubication_img" />
                                    <p className="aa_location">{location}</p>
                                </>
                        }
                    </div>
                    {
                        (!dataLocation.lat || !dataLocation.lng)
                        &&
                        <>
                            <p className="aa_parrafo">Want more specific information related to your property? Use our address finder to get more in-depth recommendations.</p>
                            <Link to="/search" className="aa_btn_search" onClick={() => sessionStorage.removeItem('full')}>
                                <img src={marcador} alt={marcador} />
                                <p>Find my property</p>
                            </Link>
                        </>
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
