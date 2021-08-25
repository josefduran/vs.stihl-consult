import { useSelector } from "react-redux"
import { CardAsideRigth } from "../productSelected/CardAsideRigth"

export const OtherOptions = () => {

    const { otherOptions } = useSelector(state => state.products)

    return (
        <div className="item_grid other_options_ps">
            <h2 className="title_otheroptions">Other options</h2>
            {
                otherOptions.map(product => (
                    <CardAsideRigth key={product.pcId} productSelected={product} />
                ))
            }

        </div>
    )
}
