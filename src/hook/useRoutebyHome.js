import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { filterSelected } from "../redux/actions/actionFilter";
import { locationSelected } from "../redux/actions/actionLocation";

export const useRoutebyHome = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClickGoSearch = (option) => {

        let route = ""
        if (option === "search") {
            route = "search"
        } else {
            route = "options"
            dispatch(locationSelected(option));

            let data = {
                power: "",
                frequent: "",
                vegetation: "",
            }

            switch (option) {
                case "+1 acre":
                    data = {
                        power: "electric",
                        frequent: "constant",
                        vegetation: "heavy",
                    }
                    break;

                case "-1 acre":
                    data = {
                        power: "electric",
                        frequent: "infrequent",
                        vegetation: "medium",
                    }
                    break;

                case "small yard":
                    data = {
                        power: "electric",
                        frequent: "frequent",
                        vegetation: "light",
                    }
                    break;

                default: break;
            }
            
            sessionStorage.setItem("filter", JSON.stringify(data))
            dispatch(filterSelected(data.power, data.frequent, data.vegetation));

        }

        history.push(`/${route}`);
    };

    return {
        handleClickGoSearch,

    }
}
