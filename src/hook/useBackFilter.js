import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { filterSelected } from "../redux/actions/actionFilter";
import { selectProduct, setOtherProducts } from "../redux/actions/actionProducts";


export const useBackFilter = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const { productSelected, otherOptions } = useSelector(state => state.products)
    const { address } = useSelector(state => state.location);
    const { power, frequent, vegetation } = useSelector(state => state.filter);


    const handleClick = (optionRoute, isGoBack = false) => {
        if (isGoBack && history.location.pathname === "/options") backLocation(address, optionRoute);
        else history.push(`/${optionRoute}`);
    };

    const backLocation = (address = "", optionRoute) => {
        switch (address) {
            case "+1 acre": doDispatch(productSelected, "electric", "constant", "heavy"); break;
            case "-1 acre": doDispatch(productSelected, "electric", "infrequent", "medium"); break;
            case "small yard": doDispatch(productSelected, "electric", "frequent", "light"); break;
            default:

                if (Object.keys(productSelected).length !== 0 || otherOptions.length !== 0) {
                    dispatch(setOtherProducts([]));
                    dispatch(selectProduct({}))
                    localStorage.removeItem("product");
                } else {
                    history.push(`/${optionRoute}`);
                }
        }
    };

    const doDispatch = (productSelected, typePower = "", typeSize = "", typeVegetation = "") => {

        if (Object.keys(productSelected).length !== 0 || otherOptions.length !== 0) {
            dispatch(selectProduct({}))
            dispatch(setOtherProducts([]));
            localStorage.removeItem("product");
        } else {
            if (typePower !== power || typeSize !== frequent || vegetation !== typeVegetation) {
                dispatch(filterSelected(typePower, typeSize, typeVegetation))
            } else {
                history.push(`/index`);
            }
        }
    };

    return {
        handleClick
    }
}
