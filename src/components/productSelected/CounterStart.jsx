import { useEffect, useState } from 'react'

const startFill = 'https://res.cloudinary.com/ddeguj0jq/image/upload/v1630704635/star_fill_sfuq9n.png'

const startClean = 'https://i.ibb.co/RyqFHVH/star-clean.png'

export const CounterStart = ({ rating, isCardRigth = true }) => {
    const [starts, setStarts] = useState([])
    const [noStarts, setNoStarts] = useState([])

    useEffect(() => {
        let arr = [];
        const cantidad = Math.round(rating);
        for (let index = 0; index < cantidad; index++) {
            arr.push(index + 1)
        }

        if (arr.length < 5) {
            let noArr = []
            for (let index = 0; index < (5 - cantidad); index++) {
                noArr.push(index + 1)
            }
            setNoStarts(noArr)
        }

        setStarts(arr);
    }, [])

    return (
        <div className={`${(isCardRigth) ? 'content_stars' : 'container_starts_others'}`}>
            {
                starts.map(start => (
                    <div className={`${(isCardRigth) ? 'content_img_start' : 'content_img_start_others_product'}`} key={start}>
                        <img src={startFill} alt={startFill} draggable={false} />
                    </div>
                ))
            }
            {
                noStarts.map(start => (
                    <div className={`${(isCardRigth) ? 'content_img_start' : 'content_img_start_others_product'}`} key={start}>
                        <img src={startClean} alt={startClean} draggable={false} />
                    </div>
                ))
            }
            <div className={`${(isCardRigth) ? 'text_star' : 'text_star_other_product'}`}>
                <p> <b>{rating}/5 </b> <span>(16.1)</span></p>
            </div>
        </div>
    )
}
