import { useState } from "react"
import { getImageProduct } from "../helper/getImageProduct"

import { InfoProduct } from "./productSelected/InfoProduct"
import { NavSection } from "./productSelected/NavSection";

import { CardAsideRigth } from "./productSelected/CardAsideRigth";

export const ProductSelected = ({ productSelected }) => {
    const noFound = 'https://i.ibb.co/71sL6cC/images.png'

    const { ongDescription = "", name = "", relativeUrl, ratings } = productSelected

    const [sectionSelect, setSectionSelect] = useState("1");

    const handleChangeSelectNav = ({ target }) => setSectionSelect(target.id)

    const showInfo = () => {

        switch (sectionSelect) {
            case "1": return <InfoProduct productSelected={productSelected} />
            case "2": return <p className="title_ps">seccion {`${sectionSelect}`}</p>
            case "3": return <p className="title_ps">seccion {`${sectionSelect}`}</p>
            case "4": return <p className="title_ps">seccion {`${sectionSelect}`}</p>
            default: break;
        }
    };

    return (
        <div className="grid_container_ps">

            <div className="item_grid info_product_ps">

                <div className="subgrid product">
                    <h5 className="title_ps">{name}</h5>
                    <div>
                        {
                            (relativeUrl)
                                ? getImageProduct(relativeUrl[0])
                                : <img src={noFound} alt="loading.gif" />
                        }
                    </div>
                    <p className="sub_ps">View product</p>
                </div>

                <div className="subgrid info">
                    <NavSection sectionSelect={sectionSelect} handleChangeSelectNav={handleChangeSelectNav} />

                    <div className="section_selected_ps">
                        {showInfo()}
                    </div>

                </div>
            </div>

            <div className="item_grid other_options_ps">

                <CardAsideRigth productSelected={productSelected}  />
                <CardAsideRigth productSelected={productSelected}  />
                <CardAsideRigth productSelected={productSelected}  />
                <CardAsideRigth productSelected={productSelected}  />
                <CardAsideRigth productSelected={productSelected}  />

            </div>

        </div>
    )
}
