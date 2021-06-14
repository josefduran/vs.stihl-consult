import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { locationSelected } from '../../redux/actions/actionLocation';

export const HomePage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleClickGoSearch = (option) => {
        
        dispatch(locationSelected(option))

        let route = (option === "search") ? "search" : "options" 
        
        history.push(`/${route}`)
        
    };

    return (
        <div className="hp_background">
            <label className="hp_label">Lorem</label>
            <div className="hp_container_text">
                <h1 className="hp_title">Build your lawn care bundle</h1>
                <p className="hp_subtitle">Use our simple tool to find the perfect set of yard tools for your yard</p>
            </div>

            <div className="hp_container_cards">
                <div className="hp_card" onClick={ ()=> handleClickGoSearch("+1 acre") }>
                    <img src="../../assets/home.png" alt="home.png"/>
                    <p>+1 acre</p>
                </div>
                <div className="hp_card" onClick={ ()=> handleClickGoSearch("-1 acree") }>
                    <img src="../../assets/home.png" alt="home.png"/>
                    <p>-1 acre</p>
                </div>
                <div className="hp_card" onClick={ ()=> handleClickGoSearch("small yard") }>
                    <img src="../../assets/home.png" alt="home.png"/>
                    <p>small yard</p>
                </div>
                <div className="hp_card" onClick={ ()=> handleClickGoSearch("search")}>
                    <img src="../../assets/marcador-de-posicion.png" alt="marcador.png"/>
                    <p>use my address</p>
                </div>
            </div>

            <div className="hp_logo logo media_logo">
                <p>EDGE</p>
            </div>
        </div>
    )
}
