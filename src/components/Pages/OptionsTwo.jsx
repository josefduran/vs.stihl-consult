import React from 'react'
import { useSelector } from 'react-redux'

export const OptionsTwo = () => {
    const { pathImg } = useSelector(state => state.products);
    return (

        <div className="contenedor_opt">

            {
                (pathImg.lenght !== 0) && pathImg.map(pathImg => (

                    <div className="img_content" key={pathImg}>
                        <div className="img">
                            <img src={`${pathImg}`} alt={`${pathImg}`} />
                        </div>
                        <div className="url">
                            <p>{pathImg}</p>
                        </div>

                    </div>

                ))
            }


        </div>
    )
}
