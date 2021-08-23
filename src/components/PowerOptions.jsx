import { useFiltered } from "../hook/useFiltered"
import marcador from '../assets/marcador-de-posicion.png'
import { useSelector } from "react-redux";

export const PowerOptions = () => {

    const { handleChange } = useFiltered();
    const opt_filtered = useSelector(state => state.filter);

    return (
        <div className="rp_container_item_radio" >
                <span className="cp_question">What is your preference for power</span>
                <div className="cp_grid_power">
                    <div>
                        <div className="cp_radio_circle">
                            <input
                                type="radio"
                                name={"power"}
                                id={"gas"}
                                onChange={handleChange}
                                checked={([opt_filtered.power].includes("gas")) && true}
                            />
                            <label htmlFor={"gas"} className={`cp_line_power cp_label_circle`} />
                        </div>
                        <div className={`cp_icon_item_container`}>
                            <img src={marcador} alt="img_path" />
                            <p className={""}><b>Gas</b> </p>
                        </div>
                    </div>
                    <div>
                        <div className="cp_radio_circle">
                            <input
                                type="radio"
                                name={"power"}
                                id={"battery"}
                                onChange={handleChange}
                                checked={([opt_filtered.power].includes("battery")) && true}
                            />
                            <label htmlFor={"battery"} className={`cp_line_power cp_label_circle`} />
                        </div>
                        <div className={`cp_icon_item_container `}>
                            <img src={marcador} alt="img_path" />
                            <p className={""}><b>Battery</b> </p>
                        </div>
                    </div>
                    <div>
                        <div className="cp_radio_circle">
                            <input
                                type="radio"
                                name={"power"}
                                id={"electric"}
                                onChange={handleChange}
                                checked={([opt_filtered.power].includes("electric")) && true }
                            />
                            <label htmlFor={"electric"} className={`cp_line_power cp_label_circle`} />
                        </div>
                        <div className={`cp_icon_item_container`}>
                            <img src={marcador} alt="img_path" />
                            <p className={""}><b>Electric</b> </p>
                        </div>
                    </div>
                    <div>
                        <div className="cp_radio_circle">
                            <input
                                type="radio"
                                name={"power"}
                                id={"none"}
                                onChange={handleChange}
                                checked={([opt_filtered.power].includes("none")) && true}
                            />
                            <label htmlFor={"none"} className={`cp_none cp_label_circle`} />
                        </div>
                        <div className={`cp_icon_item_container`}>
                            <img src={marcador} alt="img_path" />
                            <p className={""}><b>Others</b> </p>
                        </div>
                    </div>
                </div>
            </div>
    )
}
