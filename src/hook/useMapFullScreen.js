import React from 'react';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { loadGoogleMapScript } from "../helper/loadGoogleMapScript";

export const useMapFullScreen = () => {
    const fullScreen = sessionStorage.getItem('full');
    
    const [isFullScreen, setIsFullScreen] = useState((fullScreen === "false") ? false : true)
    const dataLocation = useSelector(state => state.location);

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

    // useEffect(() => {

    //     if (isFullScreen) {
    //         setTimeout(() => {

    //             sessionStorage.setItem('full', "false");

    //             const $fullScreen = document.querySelector('.full-screen');
    //             const $mapFull = document.querySelector('.map-full');

    //             if ($fullScreen) {
    //                 $fullScreen.classList.add('animate__slideOutLeft');
    //                 $mapFull.classList.remove('animate__zoomIn')
    //                 setTimeout(() => {
    //                     $fullScreen.style.display = "none";
    //                     $fullScreen.classList.remove('animate__slideOutLeft');
    //                     setIsFullScreen(false);
    //                 }, 4000);
    //             }


    //         }, 3000);
    //     }

    //     return () => {
    //         setIsFullScreen(false);
    //     }
    // }, []);

    const mapFullScreen = () => {

        return (isFullScreen) && 
        <div className='full-screen animate__animated'>
            <span>Your address</span>
            <div className='map-full animate__animated animate__zoomIn'></div>
        </div>
    }

    return {
        mapFullScreen
    }
}
