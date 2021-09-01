

import { useState } from 'react';
import { CounterStart } from './CounterStart';

export const InfoProduct = ({ productSelected }) => {

    const { name, shortDescription ,longDescription, ratings, prices } = productSelected;
    const [typeDescription, setTypeDescription] = useState(false)
   
    const handleSeeType = () => {
        setTypeDescription(!typeDescription);
        const div = document.querySelector('.rp_container');
        div.scrollTop = div.scrollHeight;
    };

    return (
        <>
            <h5 className="title_ps_info_nav">{name}</h5>

            <div className="header_nav">
                <div className="details_starts">
                       <CounterStart rating={ratings.rating}/> 
                   
                    
                </div>
                <div className="container_btn_ps">
                    <button className="btn_seeFull" onClick={handleSeeType}>
                        { (typeDescription) ? 'See less' : 'See more'}
                    </button>
                </div>
            </div>
            <div className="content_text_ps">
                <p className="long_desc_ps">
                { (typeDescription) ?  longDescription: shortDescription }
                </p>
            </div>
            <p className="price_ps"><b>$ {prices[0].amount}</b></p>
        </>
    )
}
