import { data_options_radio } from '../assets/data'
import { Card } from './Card'
import {  CustomOptions } from './CustomOptions'

const list = [1,2,3,4,5];

export const RecommendedProducts = () => {

    return (
        <div className="rp_container">
            <h2 className="rp_subtitle">You're an outdoor boss</h2>

            <div className="rp_container_options_radio">
               {
                   data_options_radio.map( opt => <CustomOptions key={opt.name} {...opt}/> )
               }
            </div>

            <div className="container_cards">
                {
                    list.map(item => <Card key={item} />)
                }
            </div>
        </div>
    )
}
