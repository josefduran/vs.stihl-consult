import { useState } from "react";


export const useForm = () => {

    const [search, setSearch] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (search.trim().length === 0) {
            alert("this null")
        }
        else {
            alert(search)
            setSearch("");
        }

        e.target[0].focus();
    };

    return {
        handleSubmit,
        search,
        setSearch
    }

}
