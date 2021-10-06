import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { img_paths } from '../data/img';
import { loadGoogleMapScript } from "../helper/loadGoogleMapScript";

const { arrow } = img_paths

export const useMapFullScreen = () => {
    const fullScreen = sessionStorage.getItem('full');

    const [isFullScreen, setIsFullScreen] = useState((fullScreen === "false") ? false : true)
    const dataLocation = useSelector(state => state.location);

    useEffect(() => {

        if (!isFullScreen) {
            const $aa_map = document.querySelector('.aa_map');
            if ($aa_map) $aa_map.id = "map"
        }

    }, [])

    useEffect(() => {

        // const $map = document.querySelector('#map');
        // if($map){

        //     $map.textContent ="YO TENGO EL ID MAP"
        // }
        loadGoogleMapScript(() => {

            if (dataLocation.lat || dataLocation.lng) {

                const $map = document.getElementById("map");

                if ($map) {
                    console.log('ejeucion del mapa- alerta -')
                    function initMap() {
                        new window.google.maps.Map($map, {
                            center: { lat: dataLocation.lat, lng: dataLocation.lng },
                            zoom: 18,
                            mapTypeId: "satellite",
                            heading: 90,
                            tilt: 45,
                            disableDefaultUI: true,
                            mapTypeControl: false,
                            zoomControl: isFullScreen
                        });
                    }

                    initMap();
                }
            }
        });


    }, [dataLocation, isFullScreen]);



    const handleCloseMap = () => {

        sessionStorage.setItem('full', "false");
        setIsFullScreen(false);

        const $aa_map = document.querySelector('.aa_map');
        if ($aa_map) $aa_map.id = "map"

        const $mapfull = document.querySelector('.map-full');
        if ($mapfull) $mapfull.remove()
    };

    const mapFullScreen = () => {

        return (isFullScreen) &&

            <div className='full-screen animate__animated'>
                <div id="map" className='map-full animate__animated animate__zoomIn'></div>
                <button className="close_map" onClick={handleCloseMap}>
                    <span onClick={handleCloseMap}>continue</span>
                    <img src={arrow} alt={arrow} onClick={handleCloseMap} />
                </button>
            </div>
    }

    return {
        mapFullScreen,
    }
}