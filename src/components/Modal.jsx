import { useContext, useEffect } from "react";
import { FormModalContext } from "../context/FormModalContext";
import { ModalContent } from "./ModalContent";
import { RegistrationForm } from "./RegistrationForm";

export const Modal = () => {
    
    const { isComplete, setIsComplete } = useContext(FormModalContext)
    
    useEffect(() => {
        
        return () => {
            setIsComplete(true)
        }
    }, [])

    return (
        <>
            <div className="overlay">
                <div className={`${(!isComplete) ? 'container_modal_form': 'container_modal container_modal_three' }`} >

                    <h2 className={`${(!isComplete) ? 'title_modal_form': 'title_car' }`} > 
                        { (!isComplete) ? 'STIHL PRODUCT REGISTRATION' :'Lawn Care Kit Summary' }
                    </h2>

                    {
                        (isComplete)
                            ? <ModalContent/>
                            : <RegistrationForm/>
                    }

                </div>
            </div>
        </>
    )
}
