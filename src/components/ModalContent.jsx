import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModalContext } from "../context/FormModalContext";
import { img_paths } from "../data/img";
import { changeStateModal } from "../redux/actions/actionCar";

const { remove, vacio, close, carta } = img_paths;

export const ModalContent = () => {

    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);
    const { car, trash: trashStorage } = useSelector(state => state.car);

    // const [isComplete, setIsComplete] = useState(false); //un action
    const { setIsComplete } = useContext(FormModalContext)
    
    useEffect(() => {
        if (car.length !== 0) {

            let total = 0;
            car.forEach(product => {
                total = product.prices[0].amount + total
            });

            setTotalAmount(total.toFixed(2))
        }
    }, [car, trashStorage]);

    const handleBuyProducts = (e) => {
        e.preventDefault();
        if (window.navigator.onLine) {
            if (totalAmount === 0) alert('Selecciona productos para comprar')
            
            if(!(Number(totalAmount) === 0.00)) setIsComplete(false); //hacer dispatch

        } else {
            alert("Internet is required to make this purchase")
        }
    };

    const handleDeleteItemCar = (pcId) => {
        let newCar = []
        let trash = []

        if (car) {
            newCar = car.filter(product => product.pcId !== pcId);
            trash = car.filter(product => product.pcId === pcId);
        }

        dispatch(addProductToCar(newCar));

        let arrFinal = []
        if (trashStorage.length !== 0) { arrFinal = [...trash, ...trashStorage] }
        else { arrFinal = trash }

        // setTrashStorage(arrFinal)
        dispatch(addProductToTrash(arrFinal));
        localStorage.setItem('trash', JSON.stringify(arrFinal))
    };

    return (
        <>
            <img className="close_modal_btn" src={close} alt={close} onClick={() => dispatch(changeStateModal())} />
            <div className={`container_items_car container_items_car_full `}>
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
            <div className="container_btn_card">
                <form onSubmit={handleBuyProducts} className="form_email_modal">
                    <button
                        className="btn_buy"
                        disabled={(Number(totalAmount) === 0.00) ? true : false}
                    >
                        <span>Email Me</span>
                        <img src={carta} alt={carta} />
                    </button>
                </form>
            </div>
        </>
    )
}
