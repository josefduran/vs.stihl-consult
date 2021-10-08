import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { img_paths } from "../data/img";
import { addProductToCar, addProductToTrash, changeStateModal } from "../redux/actions/actionCar";


const { remove, add, vacio, close, carta } = img_paths;


export const Modal = () => {


    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0)
    // const [trashStorage, setTrashStorage] = useState(initialTrash);
    const { car, trash: trashStorage } = useSelector(state => state.car);
    const { data: products } = useSelector(state => state.products);
    const [checked, setchecked] = useState(true)

    useEffect(() => {

        const initialTrash = JSON.parse(localStorage.getItem('trash')) || [];

        if (initialTrash) dispatch(addProductToTrash(initialTrash))

    }, [trashStorage.length])

    useEffect(() => {
        if (car.length !== 0) {

            let total = 0;
            car.forEach(product => {
                total = product.prices[0].amount + total
            });

            setTotalAmount(total.toFixed(2))
        }
    }, [car, trashStorage]);

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

    const handleAddItemCar = (pcId, data) => {

        let item = data.filter(product => product.pcId === pcId);
        let newCar = (car) ? car : [];
        newCar.unshift(...item);
        dispatch(addProductToCar(newCar));

        const newTrashStorage = trashStorage.filter(trash => trash.pcId !== pcId);
        // setTrashStorage(newTrashStorage);
        dispatch(addProductToTrash(newTrashStorage));

        localStorage.setItem('trash', JSON.stringify(newTrashStorage))
    };

    const handleBuyProducts = (e) => {
        e.preventDefault();
        setchecked(false);
        // if (window.navigator.onLine) {
        //     if (totalAmount === 0) alert('Selecciona productos para comprar')
        //     else alert(`Total a pagar ${totalAmount}`)
        // } else {
        //     alert("Internet is required to make this purchase")
        // }
    };

    return (
        <>
            <div className="overlay">
                <div className={`container_modal ${(trashStorage.length === 0) && 'container_modal_three'}`}>
                    <img className="close_modal_btn" src={close} alt={close} onClick={() => dispatch(changeStateModal())} />
                    <h2 className="title_car">Lawn Care Kit Summary</h2>

                    <span>
                    {checked ? (
                        <span>
                        <div className={`container_items_car ${(trashStorage.length === 0) && 'container_items_car_full'} `}>
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
                                    <span>Continue</span>
                                    <img src={carta} alt={carta} />
                                </button>
                            </form>
                        </div>
                        </span>
                    ) : (
                        <span>
                        <div className="container_btn_card">
                            <div className="container_input_modal">
                                <label htmlFor="email_send">Your email:</label>
                                <input type="email" id="email_send" placeholder="" required />
                            </div>
                        </div>
                        <div className="container_btn_card">
                            <div className="container_input_modal">
                                <label htmlFor="email_send">Street Address</label>
                                <input type="email" id="email_send" placeholder="" required />
                            </div>
                        </div>
                        <div className="container_btn_card">
                            <div className="container_input_modal">
                                <label htmlFor="email_send">City:</label>
                                <input type="email" id="email_send" placeholder="" required />
                            </div>
                        </div>
                        <div className="container_btn_card">
                            <div className="container_input_modal">
                                <label htmlFor="email_send">Zip Code:</label>
                                <input type="email" id="email_send" placeholder="" required />
                            </div>
                        </div>
                        <div className="container_btn_card">
                            <div className="container_input_modal">
                                <label htmlFor="email_send">State:</label>
                                <input type="email" id="email_send" placeholder="" required />
                            </div>
                        </div>
                        <div className="container_btn_card">
                            <div className="container_input_modal">
                                <label htmlFor="email_send">Country:</label>
                                <input type="email" id="email_send" placeholder="" required />
                            </div>
                        </div>
                        <br></br>
                        <form onSubmit={handleBuyProducts} className="form_email_modal">
                        <button
                            className="btn_buy"
                            disabled={(Number(totalAmount) === 0.00) ? true : false}
                        >
                            <span>Email Me</span>
                            <img src={carta} alt={carta} />
                        </button>
                         </form>
                        </span>
                    )}
                    </span>

                    {/* <div className={` ${(trashStorage.length === 0) && 'hidden'} `}>
                        <p>Products recently removed from kit 🗑️</p>
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
                    </div> */}

                </div>
            </div>
        </>
    )
}
