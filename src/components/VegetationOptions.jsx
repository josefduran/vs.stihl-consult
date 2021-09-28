
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { tags } from "../data";
import { useFiltered } from "../hook/useFiltered";
import { addProductToCar } from "../redux/actions/actionCar";
import { filterSelected } from "../redux/actions/actionFilter";



export const VegetationOptions = () => {

    const { opt_filtered } = useFiltered();
    const dispatch = useDispatch();

    const [tagsState, setTagsState] = useState([])

    let typePower = opt_filtered.power;
    // tags[typePower].length = 12;
    useEffect(() => {

        setTagsState([])

        tags[typePower].forEach(tag => {
            if (!tag.includes("Property") && !tag.includes("usage")) {
                document.querySelector(`#${tag.split(' ').join('-')}`).checked = false;
            }
        });

        const $icons = document.querySelectorAll('.tag_x');
        $icons.forEach(icon => {
            if (icon.classList.contains('open')) {
                icon.classList.remove('open')
                icon.classList.add('close');
                icon.textContent = '➖';
            }
        });

    }, [typePower]);


    const onChange = (e) => {
        const target = e.target
        const icon = e.target.labels[0].children[1];
        let isRemove = true;

        if (icon.classList.contains('close')) {
            icon.textContent = '➕';
            icon.classList.add('open')
            icon.classList.remove('close')

        } else {
            icon.textContent = '➖'
            icon.classList.add('close')
            icon.classList.remove('open')
            isRemove = false
        }

        removeTagList(target, isRemove);
    };

    const removeTagList = (target, isRemove) => {

        let tagName = target.id.split('-').join(' ');

        const tagsList = []

        tags[typePower].forEach(tag => {
            if (!tag.includes("Property") && !tag.includes("usage")) tagsList.push(tag)
        });

        let tagStorage = []
        
        if (!isRemove) {
            let arr = tagsState.filter( tag => tag !== "none");

            arr.push(tagName);
            
            tagStorage = arr

        } else {

            tagStorage = tagsList.filter(tag => tag !== tagName);

            if (tagsState.length !== 0) { tagStorage = tagStorage.filter(arr => tagsState.includes(arr)) }

            if (tagStorage.length === 0) { tagStorage.push("none") }

        }

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
                        (tags[typePower]) && tags[typePower].map(tag => (
                            (!tag.includes("Property") && !tag.includes("usage")) &&
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
                                    <span className="tag_x close">➖</span>
                                </label>
                            </div>
                        ))
                    }


                </div>
            </div>


        </>
    )
}
