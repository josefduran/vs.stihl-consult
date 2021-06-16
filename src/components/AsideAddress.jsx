import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

let location = "";
export const AsideAddress = () => {

    const dataLocation = useSelector(state => state.location);

    if (dataLocation.address === "+1 acre" ||
        dataLocation.address === "-1 acre" ||
        dataLocation.address === "small yard") {
        location = "348 garden city drive, Irwin, Pa 15146"
    } else {
        location = dataLocation.address
    }


    useEffect(() => {
        
        if(dataLocation.lat || dataLocation.lng){
            function initMap() {
                new window.google.maps.Map(document.getElementById("map"), {
                    center: { lat: dataLocation.lat, lng: dataLocation.lng },
                    zoom: 20,
                });
            }
    
            initMap();
        }

    }, [dataLocation])

    return (
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
                                    <img src="../../assets/home.png" alt="ubication_img" />
                                    <p className="aa_location">Custom</p>
                                </>
                            )
                    }
                </div>
            </div>
            <div>
                <footer className="aa_footer">
                    <div className="logo aa_logo">
                        <p>EDGE</p>
                    </div>
                    <button className="aa_btn_sendKit">
                        <img src="./../assets/carta.png" alt="" />
                        <p>Send me my kit</p>
                    </button>
                </footer>
            </div>
        </div>
    )
}
