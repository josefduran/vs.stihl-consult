import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { img_paths } from '../data/img';
import { addProductToCar, addProductToTrash } from '../redux/actions/actionCar';
import { selectProduct, setOtherProducts } from '../redux/actions/actionProducts';

const { remove, add, notFound } = img_paths;

export const Card = ({ productOnly }) => {


    const { shortDescription = "", name = "", urlImage, relativeUrl, pcId, category, power, tags } = productOnly;
    const dispatch = useDispatch();
    const { data: products } = useSelector(state => state.products)
    const { car, trash } = useSelector(state => state.car);

    const [iconType, setIconType] = useState(false)


    const handleMoreDetails = () => {
        document.querySelector('.rp_container').scrollTop = 0;
        dispatch(selectProduct(productOnly));
        handleOtherOptions()
    }

    const handleOtherOptions = () => {

        let newArr = [];
        products.forEach(element => {
            (element?.power && element.pcId !== pcId) && newArr.push(element)
        });

        sessionStorage.setItem("category", category);

        let othersProducts = []

        newArr.forEach( arr => {
            let words = category.split(" ");
            let keyword = words.length === 1 ? words[0] : words[words.length - 1];
            if(arr.pcId !== pcId){
                if( arr.category.includes(keyword) ){
                    othersProducts.push(arr)
                }
            }
        })


        if (othersProducts.length !== 0) {
            document.querySelector('.rp_container').scrollTop = 0;
            dispatch(setOtherProducts(othersProducts));

            localStorage.setItem('optionProducts', JSON.stringify(othersProducts))
        }
        else alert("There are no related products whit: " + category)
    };

    useEffect(() => {

        if (car) {
            car.forEach(element => {
                if (element.pcId === pcId) {
                    setIconType(true)
                }
            });
        }

        if (trash) {
            trash.forEach(element => {
                if (element.pcId === pcId) {
                    setIconType(false)
                }
            });
        }

    }, [car.length, trash.length]);

    const handleActionToCart = () => {

        if (iconType) {

            let productsCart = [];
            let productsTrash = [];
            //remover del carrito y ponerlo en el trash ( quitar la X y poner la Y );
            productsTrash = car.filter(product => product.pcId === pcId);
            productsCart = car.filter(product => product.pcId !== pcId);
            
            dispatch(addProductToTrash([...productsTrash, ...trash]))
            dispatch(addProductToCar(productsCart));

        } else {
            let productsCart = [];
            let productsTrash = [];
            //agregar al carrito y quitarlo del trash
            productsCart = trash.filter(product => product.pcId === pcId);
            productsTrash = trash.filter(product => product.pcId !== pcId);

            productsCart = [...car,...productsCart ];

            dispatch(addProductToCar(productsCart));
            dispatch(addProductToTrash(productsTrash))
        }

        setIconType(state => !state);
    };

    return (
        <div className="card animate__animated animate__backInUp">
            <div className="icon_option">
                <img src={`${(iconType) ? remove : add}`} alt={`${(iconType) ? remove : add}`} onClick={handleActionToCart} />
            </div>

            {
                (relativeUrl)
                    ? <img src={relativeUrl[0]} alt={relativeUrl[0]} />
                    : <img src={notFound} alt={notFound} />
            }
            <div className="text_content">
                <h5>{name}</h5>
                <p className="card_desc">{shortDescription}</p>
                <p className="card_desc"><b>{power}</b></p>
                <p className="card_desc">Category: <u>{category}</u></p>
                {/* <p className="card_desc">TAGS: <b>{tags}</b></p> */}
            </div>

            <div className="container_btn">
                <button onClick={handleMoreDetails}>More details</button>
                <button onClick={handleOtherOptions}>Other options</button>
            </div>

        </div>
    )
}
