import React from 'react'

export const AsideAddress = () => {
    return (
        <div className="aa_container">
            <header className="aa_header">
                <h3><b>Your address</b></h3>
                <hr />
                <h4>348 garden city drive, Irwin, Pa 15146</h4>
                <hr />
                <h2>Acreage: <span>.33</span></h2>
            </header>
            

            <div className="aa_container_img">
                <img src="../../assets/test-img-house.jpg" alt="ubication_img" />
            </div>

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
    )
}
