import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCar, changeStateModal } from "../redux/actions/actionCar";
import remove from '../assets/remove.png'
import vacio from '../assets/vacio.png'
import close from '../assets/close.png'

export const Modal = ({ setOpenModal }) => {
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0)
    const { car } = useSelector(state => state.car);

    useEffect(() => {
        if (car) {
            let total = 0;
            car.forEach(product => {
                total = product.prices[0].amount + total
            });
            setTotalAmount(total)
        }
    }, [car]);

    const handleDeleteItemCar = (pcId) => {
        let newCar = []
        if (car) {
            newCar = car.filter(product => product.pcId !== pcId);
        }

        dispatch(addProductToCar(newCar))
    };

    const handleBuyProducts = () => {
        if(window.navigator.onLine){
            if (totalAmount === 0) alert('Selecciona productos para comprar')
            else alert(`Total a pagar ${totalAmount}`)
        }else{
            alert("Internet is required to make this purchase")
        }
        // vaciar carrito
        // dispatch(addProductToCar([]))  
    };

    return (
        <>
            <div className="overlay">
                <div className="container_modal">
                    <img className="close_modal_btn" src={close} alt={close} onClick={() => dispatch(changeStateModal())} />
                    <h2 className="title_car">Shopping cart</h2>

                    <div className="container_items_car">
                        {
                            (totalAmount === 0)
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

                    <div className="container_btn_card">
                        <p className="amount_total">Total price: <b>$ {totalAmount}</b></p>
                        <button
                            className="btn_buy"
                            onClick={handleBuyProducts}
                            disabled={(totalAmount === 0) ? true : false}
                        >Pay now</button>
                    </div>
                </div>
            </div>
        </>
    )
}
