import { useEffect } from 'react';
import { mainScript } from '../../helper/fetch_products';
import { useRoutebyHome } from '../../hook/useRoutebyHome';

export const HomePage = () => {

    const { handleClickGoSearch } = useRoutebyHome();

    useEffect(() => {
        //TODO: Ejecutarr el script de la API
        mainScript() 
    }, [])

    return (
        <div className="hp_background">
            <label className="hp_label">Lorem</label>
            <div className="hp_container_text">
                <h1 className="hp_title">Build your lawn care bundle</h1>
                <p className="hp_subtitle">Use our simple tool to find the perfect set of yard tools for your yard</p>
            </div>

            <div className="hp_container_cards">
                <div className="hp_card" onClick={() => handleClickGoSearch("+1 acre")}>
                    <img src="../../assets/home.png" alt="home.png" />
                    <p>+1 acre</p>
                </div>
                <div className="hp_card" onClick={() => handleClickGoSearch("-1 acre")}>
                    <img src="../../assets/home.png" alt="home.png" />
                    <p>-1 acre</p>
                </div>
                <div className="hp_card" onClick={() => handleClickGoSearch("small yard")}>
                    <img src="../../assets/home.png" alt="home.png" />
                    <p>small yard</p>
                </div>
                <div className="hp_card" onClick={() => handleClickGoSearch("search")}>
                    <img src="../../assets/marcador-de-posicion.png" alt="marcador.png" />
                    <p>use my address</p>
                </div>
            </div>

            <div className="hp_logo logo media_logo">
                <p>EDGE</p>
            </div>
        </div>
    )
}
