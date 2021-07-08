import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { usePlaceAutocomplete } from '../hook/usePlaceAutocomplete';
import { locationSelected } from '../redux/actions/actionLocation';

export const FormLocation = () => {

    const { place, placeInputRef } = usePlaceAutocomplete()
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = () => {

        if (placeInputRef.current.value !== "") {
            (place)
                ? dispatch(locationSelected(place.address, place.lat, place.lng))
                : dispatch(locationSelected(placeInputRef.current.value));

            history.push(`/options`)
        } else {
            alert("Enter your address")
        }
    };


    return (
        <>
            <div className="sh_backgorund_page"></div>
            <div className="sh_overlay_page"></div>

            <div className="sh_logo logo media_logo">
                <p>EDGE</p>
            </div>

            <p className="sp_text">Let's get started</p>

            <div className="sp_form">
                <div className="sp_container_input">
                    <img src="../../assets/placeholder.png" alt="placeholder.png" />

                    <input
                        autoFocus
                        type="text"
                        placeholder="Enter your address"
                        ref={placeInputRef}
                    />
                </div>
                <button onClick={handleClick}>show my fd</button>
            </div>

        </>
    )
}
