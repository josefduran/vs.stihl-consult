
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFiltered } from '../hook/useFiltered'

export const FrecuentOptions = () => {

    const { opt_filtered } = useFiltered();
    const { car } = useSelector(state => state.car);

    // useEffect(() => {
    //     // if(car.length !== 0){
    //     //     car[0].tags;
    //     // }
    // }, [opt_filtered.frequent])

    return (
        <div className="rp_container_item_radio" >
        <span className="cp_question">How often do you tend to your lawn?</span>
        <div className="cp_grid">
        <div className="line_point_large_three"></div>
            <div> 
                <div className="frecuent_option">
                    <input
                        type="radio"
                        name={"frequent"}
                        id={"infrequent"}
                        checked={ ([opt_filtered.frequent].includes("infrequent")) ? true : false }
                        disabled={true}
                    />
                    <label htmlFor={"infrequent"} className={`cp_line ${(opt_filtered.power)!=="none" && 'cp_label_circle' } `} />
                    
                </div>
                <div className={`cp_icon_item_container cp_column ${ (![opt_filtered.frequent].includes("infrequent")) && 'opacity_dis'} `}>
                    <p><b>Occasional </b> </p>
                    <p className="cp_subtitle">once or Twice/month</p>
                </div>
            </div>
            <div>
                <div className="frecuent_option">
                    <input
                        type="radio"
                        name={"frequent"}
                        id={"frequent"}
                        checked={([opt_filtered.frequent].includes("frequent")) ? true : false}
                        disabled={true}
                    />
                    <label htmlFor={"frequent"} className={`cp_line ${(opt_filtered.power)!=="none" && 'cp_label_circle' } `} />
                </div>
                <div className={`cp_icon_item_container cp_column ${ (![opt_filtered.frequent].includes("frequent")) && 'opacity_dis'}`}>
                    <p className={""}><b>Moderate </b> </p>
                    <p className="cp_subtitle">weekly</p>
                </div>
            </div>
            <div>
                <div className="frecuent_option">
                    <input
                        type="radio"
                        name={"frequent"}
                        id={"constant"}
                        checked={([opt_filtered.frequent].includes("constant")) ? true : false}
                        disabled={true}
                    />
                    <label htmlFor={"constant"} className={`cp_none ${(opt_filtered.power)!=="none" && 'cp_label_circle' } `} />
                </div>
                <div className={`cp_icon_item_container cp_column ${ (![opt_filtered.frequent].includes("constant")) && 'opacity_dis'} `}>
                    <p className={""}><b>Heavy</b> </p>
                    <p className="cp_subtitle">almost daily</p>
                </div>
            </div>
        </div>
    </div>
    )
}
