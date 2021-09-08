
export const FeaturesProduct = ({productSelected}) => {

  const { features } = productSelected
  
    return (
        <div>
          <h3 className="subtitle_tab">FEATURES</h3>
            {
              (features.length !== 0)
                ? features.map((product,index)=>(
                  <div className="product_feature" key={index}>
                    <p>{product.name}</p>
                    <p className="img_feature">{product.imageProcessUrl}</p>
                  </div>
                ))
                :<p className="empty_options">No features</p>
            }
        </div>
    )
}
