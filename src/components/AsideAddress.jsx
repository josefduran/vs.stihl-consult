import React from 'react'
import { useSelector } from 'react-redux'

export const AsideAddress = () => {

    const { location } = useSelector(state => state.location);

    return (
        <div className="aa_container">
            <div>
                <header className="aa_header">
                    <h3><b>Your address</b></h3>
                    <hr />
                    <h4>348 garden city drive, Irwin, Pa 15146</h4>
                    <hr />
                <h2>ACREAGE: 33</h2>
                </header>


                <div className="aa_container_img">
                    <img src="../../assets/home.png" alt="ubication_img" />
                    <p className="aa_location">{
                        (location) ? location : sessionStorage.getItem("location")
                    }</p>
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
