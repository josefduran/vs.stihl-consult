import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, setOtherProducts } from '../redux/actions/actionProducts';
import { getImageProduct } from '../helper/getImageProduct';


export const Card = ({productOnly }) => {
    
    const noFound  = 'https://i.ibb.co/71sL6cC/images.png'

    const {shortDescription="",name="",urlImage, relativeUrl,pcId,category } = productOnly;
    const dispatch = useDispatch();
    const { data: products } = useSelector(state => state.products)

    const handleMoreDetails = () => {
        document.querySelector('.rp_container').scrollTop = 0;
        dispatch(selectProduct(productOnly));
    }

    const handleOtherOptions = () => {

        let newArr = [];
        products.forEach(element => {
            (element?.power) && newArr.push(element)
        });

        let othersProducts = newArr.filter( product => product.category === category && product.pcId !== pcId);
        console.log(othersProducts)

        if(othersProducts.length !== 0) {
            document.querySelector('.rp_container').scrollTop = 0;
            dispatch(setOtherProducts(othersProducts ));
        }
        else alert("There are no related products.")
    };

    return (
        <div className="card">

            {
                (relativeUrl)
                    ? getImageProduct(relativeUrl[0])
                    : <img src={noFound} alt={noFound} />
            }
            <div className="text_content">
                <h5>{name}</h5>
                <p className="card_desc">{shortDescription}</p>
            </div>

            <div className="container_btn">
                <button onClick={() => { handleMoreDetails() }}>More details</button>
                <button onClick={() => { handleOtherOptions() }}>Other options</button>
            </div>

        </div>
    )
}
