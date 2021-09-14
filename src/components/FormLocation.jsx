import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { usePlaceAutocomplete } from '../hook/usePlaceAutocomplete';
import { locationSelected } from '../redux/actions/actionLocation';

const placeHolder = 'https://i.ibb.co/vD2F9GC/placeholder.png'
const logo = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1630705467/logo_mrx3fr.png';

export const FormLocation = () => {

    const { place, placeInputRef } = usePlaceAutocomplete()
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleClick = () => {
        
        if (placeInputRef.current.value !== "") {
                if(place){
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
                    <img src={placeHolder} alt="placeholder.png" />

                    <input
                        autoFocus
                        type="text"
                        placeholder="Enter your address"
                        ref={placeInputRef}
                    />
                </div>
                <button onClick={handleClick}>show mi kit</button>
                <div className="email-keyboard"></div>
            </div>

        </>
    )
}
