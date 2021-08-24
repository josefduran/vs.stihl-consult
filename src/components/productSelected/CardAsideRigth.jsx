
import { getImageProduct } from '../../helper/getImageProduct'
import { CounterStart } from './CounterStart'

export const CardAsideRigth = ({ productSelected }) => {

    const { relativeUrl, name, ratings } =productSelected
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

                <p className="desc_other_product">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, corrupti corporis quos hic dolore quaerat?</p>
                <p className="price_other_product">24 min  - <b>$1500</b></p>
            </div>
        </div>
    )
}
