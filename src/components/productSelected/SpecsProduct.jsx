
export const SpecsProduct = ({productSelected}) => {

    const { specifications } = productSelected

    return (
        <div>
            <h3 className="subtitle_accesorie">SPECIFICATIONS</h3>
            {
                (specifications.length !== 0) 
                    ? specifications.map((product,index)=>(
                        <div key={index} className="product_speacs">
                            <p className="name_specs">{product.name} </p>
                            <p className="value_specs">{product.value}</p>
                        </div>
                    ))
                    : <p className="empty_options">No specs</p>
            }
        </div>
    )
}
