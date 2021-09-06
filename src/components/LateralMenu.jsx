import { Modal } from './Modal';
import { changeStateModal } from '../redux/actions/actionCar';
import { useDispatch, useSelector } from 'react-redux';
import { useBackFilter } from '../hook/useBackFilter';

const house = "https://i.ibb.co/zQP9kqy/house.png"
const arrow = "https://i.ibb.co/T2ws4YV/arrows.png"
const lupa = "https://i.ibb.co/MkVR51R/lupa.png"
const card = "https://i.ibb.co/D84rLpW/card.png"

export const LateralMenu = () => {

    const { modal } = useSelector(state => state.car);
    const { handleClick } = useBackFilter();
    const dispatch = useDispatch();

    const handleClickHouse = () => {
        console.log('object')
        dispatch(changeStateModal())
        handleClick("index")
    };

    return (
        <>
            {
                (modal) && <Modal/>
            }
            <div className="lm_container_menu">

                <div className="lm_container_items">
                    <img src={house} alt="house.png" onClick={() => handleClickHouse()} />
                    <img src={arrow} alt="arrows.png" onClick={() => handleClick("index", true)} />
                    <img src={card} alt="card.png" onClick={()=> dispatch(changeStateModal())} />
                    <img src={lupa} alt="lupa_.png" onClick={() => handleClick("search")} />
                </div>
            </div>
        </>
    )
}
