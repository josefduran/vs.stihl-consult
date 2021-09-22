import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, setOtherProducts } from '../redux/actions/actionProducts';

const noFound  = 'https://i.ibb.co/71sL6cC/images.png'

export const Card = ({productOnly }) => {
    

    const {shortDescription="",name="",urlImage, relativeUrl,pcId,category,power,tags } = productOnly;
    const dispatch = useDispatch();
    const { data: products } = useSelector(state => state.products)

    const handleMoreDetails = () => {
        document.querySelector('.rp_container').scrollTop = 0;
        dispatch(selectProduct(productOnly));
        handleOtherOptions()
    }

    const handleOtherOptions = () => {

        let newArr = [];
        products.forEach(element => {
            (element?.power  && element.pcId !== pcId) && newArr.push(element)
        });

        const arrCategroyWords = category.split(" ");
        sessionStorage.setItem("category",category);
        let othersProducts = [];

        arrCategroyWords.forEach(word => {
            newArr.forEach( element => {
                
                let arrWords = element.category.split(" ");

                arrWords.forEach(e =>{
                    if(e === word) othersProducts.push(element); 
                })

            });

        });
 
        if(othersProducts.length !== 0) {
            document.querySelector('.rp_container').scrollTop = 0;
            dispatch(setOtherProducts(othersProducts));

            localStorage.setItem('optionProducts',JSON.stringify(othersProducts))
        }
        else alert("There are no related products whit: "+category)
    };

    return (
        <div className="card animate__animated animate__backInUp">

            {
                (relativeUrl)
                    ?  <img src={relativeUrl[0]} alt={relativeUrl[0]} />
                    : <img src={noFound} alt={noFound} />
            }
            <div className="text_content">
                <h5>{name}</h5>
                <p className="card_desc">{shortDescription}</p>
                <p className="card_desc"><b>{power}</b></p>
                <p className="card_desc"><u>{tags}</u></p>
            </div>

            <div className="container_btn">
                <button onClick={() => { handleMoreDetails() }}>More details</button>
                <button onClick={() => { handleOtherOptions() }}>Other options</button>
            </div>

        </div>
    )
}
