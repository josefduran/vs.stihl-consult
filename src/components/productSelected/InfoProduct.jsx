

import { CounterStart } from './CounterStart';

export const InfoProduct = ({ productSelected }) => {

    const { name, longDescription, ratings } = productSelected;
   
    return (
        <>
            <h5 className="title_ps_info_nav">{name}</h5>

            <div className="header_nav">
                <div className="details_starts">
                       <CounterStart rating={ratings.rating}/> 
                   
                    
                </div>
                <div className="container_btn_ps">
                    <button className="btn_seeFull">See Full lorem</button>
                </div>
            </div>
            <div className="content_text_ps">
                <p className="long_desc_ps">{longDescription}</p>
            </div>
            <p className="price_ps"><b>$15000</b></p>
        </>
    )
}
