
import { useEffect, useState } from 'react';
import { FormLocation } from '../FormLocation';


const loadGoogleMapScript = (callback) => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
        callback();
    } else {
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_KEY}&libraries=places`;
        window.document.body.appendChild(googleMapScript);
        googleMapScript.addEventListener("load", callback);
    }
}


export const SearchPage = () => {

    const [loadMap, setLoadMap] = useState(false);

    useEffect(() => {
        loadGoogleMapScript(() => {
            setLoadMap(true)
        });
    }, []);

    return (
        <>
            {!loadMap ? <div>Loading...</div> : <FormLocation />}
        </>
    )
}
