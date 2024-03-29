import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    
    return {
        handleChange,
        opt_filtered,
        value
    }
}
