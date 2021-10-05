import { Modal } from './Modal';
import { changeStateModal } from '../redux/actions/actionCar';
import { useDispatch, useSelector } from 'react-redux';
import { useBackFilter } from '../hook/useBackFilter';
import { img_paths } from '../data/img';

const { house, arrow, card, lupa }=img_paths




export const LateralMenu = () => {

    const { modal } = useSelector(state => state.car);
    
    const { handleClick } = useBackFilter();

    const dispatch = useDispatch();

    const handleClickHouse = () => {
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
                    <img src={card} alt="card.png" onClick={()=> dispatch(changeStateModal(!modal))} />
                    <img src={lupa} alt="lupa_.png" onClick={() => handleClick("search")} />
                </div>
            </div>
        </>
    )
}
