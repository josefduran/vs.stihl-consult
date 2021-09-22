
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFiltered } from "../hook/useFiltered";
import { addProductToCar } from "../redux/actions/actionCar";
import { filterSelected } from "../redux/actions/actionFilter";

const battery = [
    "Small Property",
    "Flower beds and Patios",
    "Flower beds",
    "Small trees",
    "Small shrubs",
    "Small bushes",
    "Occasional usage",
    "Medium Property",
    "Long fences",
    "Patio",
    "Long Driveway",
    "Medium trees",
    "Medium shrubs",
    "Medium bushes",
    "Moderate usage",
    "Large Property",
    "Multiple flower beds",
    "Deck",
    "Mature trees",
    "Mature shrubs",
    "Mature bushes",
    "Heavy usage",
]

const electric = [
    "Small Property",
    "Flower beds and Patios",
    "Small trees",
    "Small shrubs",
    "Small bushes",
    "Occasional usage",
    "Medium Property",
    "Long fences",
    "Patio",
    "Long Driveway",
    "Medium trees",
    "Medium shrubs",
    "Medium bushes",
    "Moderate usage",
    "Large Property",
    "Mature trees",
    "Mature shrubs",
    "Mature bushes",
    "Heavy usage"
]

const gas = [
    "Small Property",
    "Flower beds and Patios",
    "Small trees",
    "Small shrubs",
    "Small bushes",
    "Occasional usage",
    "Medium Property",
    "Long fences",
    "Patio",
    "Long Driveway",
    "Medium trees",
    "Medium shrubs",
    "Medium bushes",
    "Moderate usage",
    "Large Property",
    "Multiple flower beds",
    "Deck",
    "Mature trees",
    "Mature shrubs",
    "Mature bushes",
    "Heavy usage"
]

const none = [
    "Small Property",
    "Small trees",
    "Small shrubs",
    "Small bushes",
    "Occasional usage",
    "Medium Property",
    "Medium trees",
    "Medium shrubs",
    "Medium bushes",
    "Moderate usage",
    "Large Property",
    "Mature trees",
    "Mature shrubs",
    "Mature bushes",
    "Heavy usage",
    "Multiple flower beds",
    "Flower beds and Patios",
    "Long fences",
    "Patio",
    "Long Driveway",
    "Deck",
]

const tags = {
    battery,
    electric,
    gas,
    none
}

export const VegetationOptions = () => {

    const { opt_filtered } = useFiltered();
    const dispatch = useDispatch();

    const [tagsState, setTagsState] = useState([])

    let typePower = opt_filtered.power;
    // tags[typePower].length = 12;
    useEffect(() => {
        setTagsState([])

        tags[typePower].forEach( tag => {
            document.querySelector(`#${tag.split(' ').join('-')}`).checked = false;
        });

    }, [typePower]);


    const onChange = ({ target }) => {
        
        let tagName = target.id.split('-').join(' ');

        let tagStorage = tags[typePower].filter(tag => tag !== tagName );
        
        if(tagsState.length !== 0) { tagStorage = tagStorage.filter(arr => tagsState.includes(arr)) }

        setTagsState(tagStorage);

        const value = {
            power: opt_filtered.power,
            frequent: opt_filtered.frequent,
            vegetation: tagStorage,
        }

        dispatch(addProductToCar([]));
        sessionStorage.removeItem('trash')
        dispatch(filterSelected(opt_filtered.power, opt_filtered.frequent, tagStorage));
        sessionStorage.setItem("filter", JSON.stringify(value))
    };

    return (
        <>

            <div className="rp_container_item_radio" >
                <span className="cp_question">How heavy is the vegetation on your property</span>
                <div className="cp_grid_tags">
                    {
                        tags[typePower].map(tag => (
                            <div key={tag}>
                                <input
                                    className="tag_cp"
                                    type="checkbox"
                                    title={tag}
                                    name="" id={tag.split(' ').join('-')}
                                    onChange={onChange}
                                />
                                <label className="tag_cp_label" htmlFor={tag.split(' ').join('-')}>
                                    <span>{tag}</span>
                                    <span className="tag_x">❌</span>
                                </label>
                            </div>
                        ))
                    }

                    {/* <div className="line_point_large_three"></div> */}
                    {/* <div>
                        <div className="cp_radio_circle">
                            <input
                                type="radio"
                                name={"vegetation"}
                                id={"light"}
                                onChange={handleChange}
                                checked={([opt_filtered.vegetation].includes("light")) ? true : false}
                                disabled={(opt_filtered.power) === "none" ? true : false}
                            />
                            <label htmlFor={"light"} className={`cp_line ${(opt_filtered.power) !== "none" && 'cp_label_circle'} `} />
                        </div>
                        <div className={`cp_icon_item_container cp_column`}>
                            <p><b>light</b> </p>
                            <p className="cp_subtitle">once or Twice/month</p>
                        </div>
                    </div>
                    <div>
                        <div className="cp_radio_circle">
                            <input
                                type="radio"
                                name={"vegetation"}
                                id={"medium"}
                                onChange={handleChange}
                                checked={([opt_filtered.vegetation].includes("medium")) ? true : false}
                                disabled={(opt_filtered.power) === "none" ? true : false}
                            />
                            <label htmlFor={"medium"} className={`cp_line ${(opt_filtered.power) !== "none" && 'cp_label_circle'} `} />
                        </div>
                        <div className={`cp_icon_item_container cp_column`}>
                            <p className={""}><b>medium</b> </p>
                            <p className="cp_subtitle">weekly</p>
                        </div>
                    </div>
                    <div>
                        <div className="cp_radio_circle">
                            <input
                                type="radio"
                                name={"vegetation"}
                                id={"heavy"}
                                onChange={handleChange}
                                checked={([opt_filtered.vegetation].includes("heavy")) ? true : false}
                                disabled={(opt_filtered.power) === "none" ? true : false}
                            />
                            <label htmlFor={"heavy"} className={`cp_none ${(opt_filtered.power) !== "none" && 'cp_label_circle'} `} />
                        </div>
                        <div className={`cp_icon_item_container cp_column`}>
                            <p className={""}><b>heavy</b> </p>
                            <p className="cp_subtitle">daily</p>
                        </div>
                    </div> */}
                </div>
            </div>


        </>
    )
}
