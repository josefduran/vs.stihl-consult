
export const ProductSelected = ({ longDescription="",name="",category="",pcId="", urlImage }) => {
    return (
        <div>
             <h2>{name}</h2>
             <p>{longDescription}</p>
             <p>{pcId}</p>
             <img src={urlImage[1]} alt={urlImage}/>
             <p>{category}</p>
        </div>
    )
}
