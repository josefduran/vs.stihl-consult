import { useFiltered } from "../hook/useFiltered"
import { useSelector } from "react-redux";
import { img_paths } from "../data/img";

const { marcador_option }=img_paths


export const PowerOptions = () => {

    const { handleChange } = useFiltered();
    const opt_filtered = useSelector(state => state.filter);

    return (
        <div className="rp_container_item_radio" >
                <span className="cp_question">What is your power preference?</span>
                <div className="cp_grid_power">
                <div className="line_point_large"></div>
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
                            <img src={marcador_option} alt="img_path" />
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
                            <img src={marcador_option} alt="img_path" />
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
                            <img src={marcador_option} alt="img_path" />
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
                            <img src={marcador_option} alt="img_path" />
                            <p className={""}><b>All</b> </p>
                        </div>
                    </div>
                </div>
            </div>
    )
}
