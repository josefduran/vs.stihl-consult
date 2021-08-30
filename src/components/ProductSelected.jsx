import { useState } from "react"
import { getImageProduct } from "../helper/getImageProduct"

import { InfoProduct } from "./productSelected/InfoProduct"
import { NavSection } from "./productSelected/NavSection";

import { BtnAddToCar } from "./BtnAddToCar";
import { FeaturesProduct } from "./productSelected/FeaturesProduct";
import { SpecsProduct } from "./productSelected/SpecsProduct";
import { AccesoriesProduct } from "./productSelected/AccesoriesProduct";

export const ProductSelected = ({ productSelected }) => {
    const noFound = 'https://i.ibb.co/71sL6cC/images.png'

    const {name = "", relativeUrl } = productSelected

    const [sectionSelect, setSectionSelect] = useState("1");

    const handleChangeSelectNav = ({ target }) => setSectionSelect(target.id)

    const showInfo = () => {

        switch (sectionSelect) {
            case "1": return <InfoProduct productSelected={productSelected} />
            case "2": return <SpecsProduct productSelected={productSelected}/>  //specifications
            case "3": return <FeaturesProduct productSelected={productSelected}/>  //features
            case "4": return <AccesoriesProduct productSelected={productSelected}/> //accesories
            default: break;
        }
    };

    return (
        <div className="grid_container_ps">

            <div className="item_grid info_product_ps">

                <div className="subgrid product">
                    <h5 className="title_ps">{name}</h5>
                    <div className="content_image_ps">
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

                        <BtnAddToCar isOtherProduct={true} productSelected={productSelected} />


                    </div>

                </div>
            </div>

            

        </div>
    )
}
