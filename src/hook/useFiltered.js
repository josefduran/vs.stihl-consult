import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tags } from "../data";
import { addProductToCar } from "../redux/actions/actionCar";
import { filterSelected } from "../redux/actions/actionFilter";



export const useFiltered = () => {

    const dispatch = useDispatch();
    const opt_filtered = useSelector(state => state.filter);

    const filter = JSON.parse(sessionStorage.getItem("filter"))

    const [value, setValue] = useState(() => ({
        power: filter?.power,
        frequent: filter?.frequent,
        vegetation: filter?.vegetation,
    }))

    const handleChange = ({ target }) => {

        dispatch(addProductToCar([])); //vaciar el carrito cada que se cambien el filtro
        sessionStorage.removeItem('trash')

        const filter = JSON.parse(sessionStorage.getItem("filter")) || "";


        const newData = {
            power: filter.power,
            frequent: filter.frequent,
            vegetation: [],
        }
        setValue({
            ...newData,
            [target.name]: target.id
        })

    };

    useEffect(() => {
        const tagsList = [];

        tags[value.power].forEach(tag => {
            if (!tag.includes("Property") && !tag.includes("usage")) tagsList.push(tag)
        });

        sessionStorage.setItem("filter", JSON.stringify(value))
        dispatch(filterSelected(value.power, value.frequent, tagsList));

    }, [value, dispatch])

    return {
        handleChange,
        opt_filtered,
        value
    }
}
