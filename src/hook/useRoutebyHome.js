import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { tags } from "../data";
import { addProductToCar, addProductToTrash } from "../redux/actions/actionCar";
import { filterSelected } from "../redux/actions/actionFilter";
import { locationSelected } from "../redux/actions/actionLocation";

export const useRoutebyHome = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { address } = useSelector(state => state.location);
    const option_filter = useSelector(state => state.filter);

    const handleClickGoSearch = (option, goToSite=true) => {

        let route = "options";
        let data = {
            power: "",
            frequent: "",
            vegetation: "",
        }
       
        if (option === "search") {
            route = "search"
        } else {
            

            if(!address || address === ''){  
                
                dispatch(locationSelected(option));

            }else{
                // sessionStorage.setItem('typeSizeAside', JSON.stringify(option))
            }    

            switch (option) {
                case "+1 acre":
                    data = {
                        power: option_filter?.power ? option_filter.power : "gas",
                        frequent: "constant",
                        vegetation: tags["moreThanOne"],
                    }
                    break;

                case "-1 acre":
                    data = {
                        power: option_filter?.power ? option_filter.power : "gas",
                        frequent: "frequent",
                        vegetation: tags["lessThanOne"],
                    }
                    break;

                case "small yard":
                    data = {
                        power: option_filter?.power ? option_filter.power : "gas",
                        frequent: "infrequent",
                        vegetation: tags["smallYard"],
                    }
                    break;

                default: 
                    data = {
                        power: option_filter?.power ? option_filter.power : "gas",
                        frequent: "infrequent",
                        vegetation: tags["smallYard"],
                    };
                    break;
            }
            
            sessionStorage.setItem("filter", JSON.stringify(data))
            // dispatch(addProductToCar([]));
            // dispatch(addProductToTrash([]));
            // localStorage.removeItem('car')
            // localStorage.removeItem('trash')

            dispatch(filterSelected(data.power, data.frequent, data.vegetation));

        }

        

        if( goToSite ){
            history.push(`/${route}`);
        }
    };

    return {
        handleClickGoSearch,

    }
}
