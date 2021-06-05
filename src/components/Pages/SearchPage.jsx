import React, { useState } from 'react'

export const SearchPage = () => {

    const [search, setSearch] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if(search.trim().length === 0){
            alert("this null")
        }
        else {
            alert(search)
            setSearch("");
        }
        
        e.target[0].focus();
    };
    
    return (
        <>
            <div className="sh_backgorund_page"></div>
            <div className="sh_overlay_page"></div>

            <div className="sh_logo logo media_logo">
                <p>EDGE</p>
            </div>

            <p className="sp_text">Let's get started</p>

            <form className="sp_form" onSubmit={handleSubmit}>
                <div className="sp_container_input">
                    <img src="../../assets/placeholder.png" alt="placeholder.png" />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Enter your address"
                        name="search"
                        value={search}
                        onChange={({ target }) => {
                            setSearch(target.value)
                        }}
                    />
                </div>
                <button>show my fd</button>
            </form>
        </>
    )
}
