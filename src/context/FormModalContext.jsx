import { createContext, useState } from "react";

export const FormModalContext = createContext({});


export const FormModalProvider = ({children}) => {

    const [isComplete, setIsComplete] = useState(true)

    return (
        <FormModalContext.Provider value={{  isComplete, setIsComplete }}>
            {children}
        </FormModalContext.Provider>
    )
}
