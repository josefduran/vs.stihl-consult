import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadGoogleMapScript } from '../helper/loadGoogleMapScript';
import { changeStateModal } from '../redux/actions/actionCar';
import { Modal } from './Modal';


let location = "";
const home = 'https://i.ibb.co/h1y2BH4/home.png'
const carta = 'https://i.ibb.co/TMxMRc7/carta.png'

const logo = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1630705467/logo_mrx3fr.png';

export const AsideAddress = () => {
    const dataLocation = useSelector(state => state.location);
    const {modal} = useSelector(state => state.car);
    const dispatch = useDispatch();

    if (dataLocation.address === "+1 acre" ||
        dataLocation.address === "-1 acre" ||
        dataLocation.address === "small yard") {
        location = "Custom address"
    } else {
        location = dataLocation.address
    }


    useEffect(() => {
        loadGoogleMapScript(() => {

            if (dataLocation.lat || dataLocation.lng) {

                function initMap() {
                    new window.google.maps.Map(document.getElementById("map"), {
                        center: { lat: dataLocation.lat, lng: dataLocation.lng },
                        zoom: 22,
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
        dispatch(changeStateModal())
    };


    return (
        <>
            {
                (modal) && <Modal/>
            }
            <div className="aa_container">
                <div>
                    <header className="aa_header">
                        <h3><b>Your address</b></h3>
                        <hr />
                        <h4>{location}</h4>
                        <hr />
                        <h2>ACREAGE: 33</h2>
                    </header>


                    <div className="aa_container_img">
                        {
                            (dataLocation.lat || dataLocation.lng)
                                ? (

                                    <div id="map" className="aa_map"></div>
                                )
                                : (
                                    <>
                                        <img src={home} alt="ubication_img" />
                                        <p className="aa_location">{dataLocation.address}</p>
                                    </>
                                )
                        }
                    </div>
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
