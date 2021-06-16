import { useEffect, useRef, useState } from "react";

export const usePlaceAutocomplete = () => {
    
    const placeInputRef = useRef(null);
    const [place, setPlace] = useState(null);

    useEffect(() => {
        initPlaceAPI();
    }, []);

    

    const initPlaceAPI = () => {
        let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
        new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
            let place = autocomplete.getPlace();
            setPlace({
                address: place?.formatted_address,
                lat: place?.geometry?.location.lat(),
                lng: place?.geometry?.location.lng()
            });
        });
    };
    
    return {
        place,
        placeInputRef
    }
}
