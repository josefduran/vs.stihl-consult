
export const AccesoriesProduct = ({ productSelected }) => {

    const { accessories } = productSelected
    return (
        <div>
            <h3 className="subtitle_tab">ACCESORIES</h3>
            {
                (accessories.length !== 0)
                ? accessories.map((product, index) => (
                    <div className="name_accesorie" key={index}>
                        <p >{product.name} </p>
                        <u className="sku_accesorie">{product.sku}</u>
                    </div>
                ))
                :
                <p className="empty_options">No hay accesorios</p>
            }
        </div>
    )
}
