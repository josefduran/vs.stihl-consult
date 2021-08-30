import { useDispatch, useSelector } from 'react-redux';
import { addProductToCar } from '../redux/actions/actionCar';
import carBtn from '../assets/carrito.png'
import { useEffect, useState } from 'react';

export const BtnAddToCar = ({isOtherProduct=false, productSelected}) => {

    const dispatch = useDispatch();
    const { car } = useSelector(state => state.car);
    const [disabledBtn, setDisabledBtn] = useState(false);

    const handleAddToCar = () => {
    
        let newCar = (car) ? car : []
        let isAProductEqual = false 
        setDisabledBtn(true);
        if(car){
            car.forEach( product => {
                if(productSelected.pcId === product.pcId){
                    isAProductEqual=true;
                    deshabilitarBtn();
                }
            });
        }

        if(!isAProductEqual){
            newCar.push(productSelected);
            dispatch(addProductToCar(newCar))
        }
        else alert(`The - ${productSelected.name} - product is already in the car`)
        console.log(car)
    };


    return (
        <div className="container_btn_car">
            <button 
                className={`btn ${ (isOtherProduct) ? 'btn_product_selected' : 'btn_other_product'}`}
                onClick={handleAddToCar}
                disabled={(disabledBtn)? true: false}
            >
                {
                    (disabledBtn) ? 'Added to car': 'Add to car'
                }
                <img src={carBtn} alt={carBtn} />
            </button>
        </div>
        
    )
}
