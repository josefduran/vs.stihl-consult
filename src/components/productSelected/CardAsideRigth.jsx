
import { getImageProduct } from '../../helper/getImageProduct'
import { CounterStart } from './CounterStart'

import { BtnAddToCar } from '../BtnAddToCar'

export const CardAsideRigth = ({ productSelected }) => {

    const { relativeUrl, name, ratings,shortDescription,prices } =productSelected
    const noFound = 'https://i.ibb.co/71sL6cC/images.png'

    return (
        <div className="card_container">
            <div className="container_img_card">
                {
                    (relativeUrl)
                        ? getImageProduct(relativeUrl[0])
                        : <img src={noFound} alt="loading.gif" />
                }
            </div>
            <div className="info_card_container">
                <p className="title_card_other">{name}</p>

                <div className="container_starts_others">
                    <CounterStart isCardRigth={false} rating={ratings.rating} />
                </div>

                <p className="desc_other_product">{shortDescription}</p>
                <p className="price_other_product">24 min  - <b>${prices[0].amount}</b></p>


                    <BtnAddToCar productSelected={productSelected}/>


            </div>
        </div>
    )
}
