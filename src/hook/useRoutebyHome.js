import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { tags } from "../data";
import { filterSelected } from "../redux/actions/actionFilter";
import { locationSelected } from "../redux/actions/actionLocation";

export const useRoutebyHome = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {address} = useSelector(state => state.location);
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
            }    
            switch (option) {
                case "+1 acre":
                    data = {
                        power: option_filter?.power ? option_filter.power : "electric",
                        frequent: "constant",
                        vegetation: tags[option_filter?.power ? option_filter.power : "electric"],
                    }
                    break;

                case "-1 acre":
                    data = {
                        power: option_filter?.power ? option_filter.power : "electric",
                        frequent: "frequent",
                        vegetation: tags[option_filter?.power ? option_filter.power : "electric"],
                    }
                    break;

                case "small yard":
                    data = {
                        power: option_filter?.power ? option_filter.power : "electric",
                        frequent: "infrequent",
                        vegetation: tags[option_filter?.power ? option_filter.power : "electric"],
                    }
                    break;

                default: 
                    data = {
                        power: "none",
                        frequent: "",
                        vegetation: tags["none"],
                    };
                    break;
            }
            
            sessionStorage.setItem("filter", JSON.stringify(data))
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
