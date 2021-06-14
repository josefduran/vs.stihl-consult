import React, { useEffect, useRef, useState } from 'react'
import { useForm } from '../hooks/useForm';

export const FormLocation = () => {

    const {handleSubmit,search, setSearch} = useForm();

    const placeInputRef = useRef(null);
    const [place, setPlace] = useState(null);

    useEffect(() => {
        initPlaceAPI();
    }, []);

    // initialize the google place autocomplete
    const initPlaceAPI = () => {
        let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
        new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
            let place = autocomplete.getPlace();
            setPlace({
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            });
        });
    };

    
    return (
        <>
            <div className="sh_backgorund_page"></div>
            <div className="sh_overlay_page"></div>

            <div className="sh_logo logo media_logo">
                <p>EDGE</p>
            </div>

            <p className="sp_text">Let's get started</p>

            <form className="sp_form" onSubmit={handleSubmit}>
                <div className="sp_container_input">
                    <img src="../../assets/placeholder.png" alt="placeholder.png" />
                    
                    <input 
                        autoFocus
                        type="text"
                        placeholder="Enter your address"
                        name="search"
                        value={search}
                        onChange={({ target }) => {
                            setSearch(target.value)
                        }}
                        ref={placeInputRef} 
                    />
                    {place && <div style={{ marginTop: 20, lineHeight: '25px' }}>
                        <div style={{ marginBottom: 10 }}><b>Selected Place</b></div>
                        <div><b>Address:</b> {place.address}</div>
                        <div><b>Lat:</b> {place.lat}</div>
                        <div><b>Lng:</b> {place.lng}</div>
                    </div>}
                </div>
                <button>show my fd</button>
            </form>

        </>
    )
}
