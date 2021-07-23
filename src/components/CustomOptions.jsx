import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterSelected } from '../redux/actions/actionFilter'

export const CustomOptions = ({ question, name, isIcon, options }) => {

    const dispatch = useDispatch();
    const opt_filtered = useSelector(state => state.filter);

    
    const filter = JSON.parse(sessionStorage.getItem("filter"))

    const [value, setValue] = useState(() => ({
        power: filter?.power,
        frequent: filter?.frequent,
        vegetation: filter?.vegetation,
    }))

    const handleChange = ({ target }) => {
        const filter = JSON.parse(sessionStorage.getItem("filter")) || "";
        const newData = {
            power: filter.power,
            frequent: filter.frequent,
            vegetation: filter.vegetation,
        }

        setValue({
            ...newData,
            [target.name]: target.id
        })

    };

    useEffect(() => {

        sessionStorage.setItem("filter", JSON.stringify(value))

        dispatch(filterSelected(value.power, value.frequent, value.vegetation))

    }, [value, dispatch])


    return (
        <div className="rp_container_item_radio">

            <span className="cp_question">{question}</span>

            <div className="cp_grid">

                {
                    options.map((opt, index) => (
                        <div key={opt.name}>

                            <div className="cp_radio_circle">

                                <input
                                    type="radio"
                                    name={name}
                                    id={opt.name}
                                    onChange={handleChange}
                                    checked={ ([opt_filtered.power, opt_filtered.vegetation,opt_filtered.frequent].includes(opt.name)) ? true:false }
                                />

                                <label  htmlFor={opt.name} className={` ${(index === 2) ? 'cp_none' : 'cp_line'}  cp_label_circle`} />

                            </div>

                            <div className={`cp_icon_item_container ${(!isIcon) && "cp_column"}`}>
                                {
                                    (isIcon) ? <img src={opt.img_path} alt="img_path" /> : <b>{opt.name}</b>
                                }
                                <p className={` ${(!isIcon) && "cp_subtitle"}`}>{(isIcon) ? <b>{opt.name}</b> : opt.subtitle}</p>
                            </div>
                        </div>
                    ))
                }



            </div>

        </div>
    )
}
