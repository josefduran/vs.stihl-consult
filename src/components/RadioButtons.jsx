import React from 'react'

export const RadioButtons = ({
    title,
    name,
    id,
    optionThree,
    optionTwo,
    optionOne,
    isIcon = false,
    text_ti
}) => {
    return (
        <div className="rp_container_item_radio">

            <span className="question">{title}</span>

            <div className="relative">

                <div className="content">
                    <div className="input_label">
                        <input type="radio" name={name} id={id} />
                        <label htmlFor={id} className="line label" />
                    </div>

                    <div className={`icon_item_container ${(!isIcon) && "column"}`}>
                        {
                            (isIcon) ? <img src="../../assets/marcador-de-posicion.png" alt="fas" /> : <b>{text_ti}</b>
                        }
                        <p className={` ${(!isIcon) && "sub"}`}>{optionOne}</p>
                    </div>
                </div>

                <div className="content">
                    <div className="input_label">
                        <input type="radio" name={name} id={id + 1} />
                        <label htmlFor={id + 1}  className="line label" />
                    </div>
                    <div className={`icon_item_container ${(!isIcon) && "column"}`}>
                        {
                            (isIcon) ? <img src="../../assets/marcador-de-posicion.png" alt="fas" /> : <b>{text_ti}</b>
                        }
                        <p className={` ${(!isIcon) && "sub"}`}>{optionTwo}</p>
                    </div>
                </div>

                <div className="content">
                    <div className="input_label">
                        <input type="radio" name={name} id={id + 2} />
                        <label htmlFor={id + 2}  className="none label" />
                    </div>

                    <div className={`icon_item_container ${(!isIcon) && "column"}`}>
                        {
                            (isIcon) ? <img src="../../assets/marcador-de-posicion.png" alt="fas" /> : <b>{text_ti}</b>
                        }
                        <p className={` ${(!isIcon) && "sub"}`}>{optionThree}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}
