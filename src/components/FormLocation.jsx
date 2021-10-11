import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { img_paths } from '../data/img';
import { usePlaceAutocomplete } from '../hook/usePlaceAutocomplete';
import { locationSelected } from '../redux/actions/actionLocation';

const { logo, marcador_option } = img_paths

export const FormLocation = () => {

    const { place, placeInputRef } = usePlaceAutocomplete()
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleClick = () => {
        
        if (placeInputRef.current.value !== "") {
                if(place){
                    sessionStorage.removeItem('full');
                    sessionStorage.removeItem('gisacre');
                    dispatch(locationSelected(place.address, place.lat, place.lng))
                    history.push(`/options`)
                }else{
                    alert('Select an option for the address')
                }
        } else {
            alert("Enter your address")
        }
    };

    // var vslynxKey = require("@spectrio/vslynx-key");
    useEffect(() => {
        dispatch(locationSelected(""));
    }, [])


    return (
        <>
            <div className="sh_backgorund_page"></div>
            <div className="sh_overlay_page"></div>

            <div className="sh_logo logo">
            <img src={logo} alt={logo} />
            </div>

            <p className="sp_text">Let's get started</p>

            <div className="sp_form">
                <div className="sp_container_input">
                    <img src={marcador_option} alt="placeholder.png" />

                    <input
                        autoFocus
                        type="text"
                        placeholder="Enter your address"
                        ref={placeInputRef}
                    />
                </div>
                <button onClick={handleClick}>show my kit</button>
                <div className="email-keyboard"></div>
            </div>

        </>
    )
}
