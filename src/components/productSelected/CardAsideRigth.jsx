
import { CounterStart } from './CounterStart'

import { BtnAddToCar } from '../BtnAddToCar'
import { useSelector } from 'react-redux';

const noFound = 'https://i.ibb.co/71sL6cC/images.png'

export const CardAsideRigth = ({ productSelected }) => {

    const { relativeUrl, name, ratings,shortDescription,prices,category } =productSelected;

    const { productSelected: pSelected } = useSelector(state => state.products)
    const isProductSelected = (Object.keys(pSelected).length !== 0)

    return (
        <div className={`card_container ${ (!isProductSelected) && 'card_container_m-auto' }`} >
            <div className="container_img_card">
                {
                    (relativeUrl)
                        ? <img src={relativeUrl[0]} alt={relativeUrl[0]} />
                        : <img src={noFound} alt="loading.gif" />
                }
            </div>
            <div className="info_card_container">
                <p className="title_card_other">{name}</p>

                <div className="container_starts_others">
                    <CounterStart isCardRigth={false} rating={(ratings) ? ratings.rating : 0} />
                </div>

                <p className="desc_other_product"><b>{category}</b></p>
                <p className="desc_other_product">{shortDescription}</p>
                <p className="price_other_product"> <b>${prices[0].amount}</b></p>


                <BtnAddToCar productSelected={productSelected}/>


            </div>
        </div>
    )
}
