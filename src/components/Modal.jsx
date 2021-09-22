import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCar, changeStateModal } from "../redux/actions/actionCar";


const remove = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1631116779/remove_ekiwtc.png'
const add = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1632196807/plus_pq8nb5.png'
const vacio = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1631116733/vacio_te0n0p.png'
const close = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1631116761/close_el9gjl.png'

export const Modal = () => {

    const initialTrash = JSON.parse(sessionStorage.getItem('trash')) || [];

    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0)
    const [trashStorage, setTrashStorage] = useState(initialTrash);
    const { car } = useSelector(state => state.car);
    const { data: products } = useSelector(state => state.products);

    useEffect(() => {
        
        if (car) {
            
            let total = 0;
            car.forEach(product => {
                total = product.prices[0].amount + total
            });
            setTotalAmount(total.toFixed(2))
        }
    }, [car,trashStorage]);

    const handleDeleteItemCar = (pcId) => {
        let newCar = []
        let trash = []

        if (car) {
            newCar = car.filter(product => product.pcId !== pcId);
            trash = car.filter(product => product.pcId === pcId);
        }

        dispatch(addProductToCar(newCar));

        let arrFinal = []
        if (trashStorage.length !== 0){ arrFinal= [...trash,...trashStorage] }
        else{ arrFinal = trash }

        setTrashStorage(arrFinal)
        sessionStorage.setItem('trash', JSON.stringify( arrFinal ))
    };

    const handleAddItemCar = (pcId, data) => {

        let item = data.filter( product => product.pcId === pcId );
        let newCar = (car) ? car : [];
        newCar.unshift(...item);
        dispatch(addProductToCar(newCar));
        
        const newTrashStorage = trashStorage.filter( trash => trash.pcId !== pcId);
        setTrashStorage(newTrashStorage);

        sessionStorage.setItem('trash', JSON.stringify( newTrashStorage ))
    };

    const handleBuyProducts = () => {
        if (window.navigator.onLine) {
            if (totalAmount === 0) alert('Selecciona productos para comprar')
            else alert(`Total a pagar ${totalAmount}`)
        } else {
            alert("Internet is required to make this purchase")
        }
    };

    return (
        <>
            <div className="overlay">
                <div className={`container_modal ${ (trashStorage.length === 0 ) && 'container_modal_three' }`}>
                    <img className="close_modal_btn" src={close} alt={close} onClick={() => dispatch(changeStateModal())} />
                    <h2 className="title_car">Shopping cart</h2>

                    <div className={`container_items_car ${ (trashStorage.length === 0 ) && 'container_items_car_full' } `}>
                        {
                            (Number(totalAmount) === 0.00)
                                ?
                                <div className="empty_shopingCar">
                                    <p className="">Empty shopping cart</p>
                                    <img src={vacio} alt={vacio} />
                                </div>
                                : (car) && car.map((item, index) => (
                                    <div className="item_car" key={item.pcId}>
                                        <p key={index}>{item.name}</p>
                                        <div className="mount_delete">
                                            <p>$ {item.prices[0].amount}</p>
                                            <img className="btn_remove" src={remove} alt={remove} onClick={() => handleDeleteItemCar(item.pcId)} />
                                        </div>
                                    </div>
                                ))
                        }
                    </div>

                    <div className={` ${ (trashStorage.length === 0 ) && 'hidden' } `}>
                        <p>Products recently removed from cart 🗑️</p>
                        <div className="container_trash">
                            {
                                (trashStorage.length !== 0) && trashStorage.map((item, index) => (
                                    <div className="item_car" key={item.pcId}>
                                        <p key={index}>{item.name}</p>
                                        <div className="mount_delete">
                                            <p>$ {item.prices[0].amount}</p>
                                            <img className="btn_remove" src={add} alt={add} onClick={() => handleAddItemCar(item.pcId, products)} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="container_btn_card">
                        <p className="amount_total">Total price: <b>$ {totalAmount}</b></p>
                        <button
                            className="btn_buy"
                            onClick={handleBuyProducts}
                            disabled={(Number(totalAmount) === 0.00) ? true : false}
                        >Pay now</button>
                    </div>
                </div>
            </div>
        </>
    )
}
