import { useSelector } from "react-redux"
import { useBackFilter } from "../../hook/useBackFilter";
import { CardAsideRigth } from "../productSelected/CardAsideRigth"

export const OtherOptions = () => {

    const { otherOptions } = useSelector(state => state.products)
    const category = sessionStorage.getItem("category");
    const { handleClick } = useBackFilter();

    return (
        <>
            <div className="header_other_options" onClick={() => handleClick("index", true)} >
                <p>TOUCH HERE TO FILTER YOUR RESULTS</p>
            </div>
            <div className="item_grid other_options_ps">



                <h2 className="title_otheroptions">Other options: <u>({category.split(" ").join(" - ")})</u></h2>
                {
                    otherOptions.map(product => (
                        <CardAsideRigth key={product.pcId} productSelected={product} />
                    ))
                }

            </div>
        </>
    )
}
