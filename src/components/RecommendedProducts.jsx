import { data_options_radio } from '../helper/data'
import { Card } from './Card'
import { CustomOptions } from './CustomOptions'

// import { products } from '../helper/data_products'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const RecommendedProducts = () => {

    const [cards, setCards] = useState([]);
    const { data:products } = useSelector(state => state.products)
    const option_filter = useSelector(state => state.filter);
    
    useEffect(() => {
            // let size = "";
            // switch (option_filter.frequent) {
            //     case "infrequent":
            //         size = "<1"; break;
            //     case "frequent":
            //         size = "1"; break;
            //     case "constant":
            //         size = ">1"; break;
            //     default: break;
            // }

            // let vegetation = "";

            // if (option_filter.vegetation === "light") {
            //     vegetation = "small"
            // }else{
            //     vegetation = option_filter.vegetation;
            // }

            // const data_filtered = products.filter(card => 
            //     card.size === size  && 
            //     card.tags.toLocaleLowerCase().includes(vegetation) &&
            //     card.power === option_filter.power
            // );

            // setCards(data_filtered);
           
            if(products.length !== 0){
                setCards(products)
                console.log(products[1])
            }

    }, [option_filter])


    return (
        <div className="rp_container">
            <h2 className="rp_subtitle">You're an outdoor boss</h2>

            <div className="rp_container_options_radio">
                {
                    data_options_radio.map(opt => <CustomOptions key={opt.name} {...opt} />)
                }
            </div>

            <div className="container_cards">
                {
                    (cards.length !== 0) 
                    ? cards.map((product, index) => <Card key={index} {...product} />)
                    : <b className="no_products">No products</b>
                }
            </div>
        </div>
    )
}
