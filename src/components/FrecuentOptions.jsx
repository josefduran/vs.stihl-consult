
import { useFiltered } from '../hook/useFiltered'

export const FrecuentOptions = () => {

    const { handleChange, opt_filtered} = useFiltered();

    return (
        <div className="rp_container_item_radio" >
        <span className="cp_question">How frequent do you plan  on working on your lawn</span>
        <div className="cp_grid">
        <div className="line_point_large_three"></div>
            <div> 
                <div className="cp_radio_circle">
                    <input
                        type="radio"
                        name={"frequent"}
                        id={"infrequent"}
                        onChange={handleChange}
                        checked={([opt_filtered.frequent].includes("infrequent")) ? true : false}
                        disabled={(opt_filtered.power)==="none"?true:false}
                    />
                    <label htmlFor={"infrequent"} className={`cp_line ${(opt_filtered.power)!=="none" && 'cp_label_circle' } `} />
                    
                </div>
                <div className={`cp_icon_item_container cp_column`}>
                    <p><b>infrequent</b> </p>
                    <p className="cp_subtitle">once or Twice/month</p>
                </div>
            </div>
            <div>
                <div className="cp_radio_circle">
                    <input
                        type="radio"
                        name={"frequent"}
                        id={"frequent"}
                        onChange={handleChange}
                        checked={([opt_filtered.frequent].includes("frequent")) ? true : false}
                        disabled={(opt_filtered.power)==="none"?true:false}
                    />
                    <label htmlFor={"frequent"} className={`cp_line ${(opt_filtered.power)!=="none" && 'cp_label_circle' } `} />
                </div>
                <div className={`cp_icon_item_container cp_column`}>
                    <p className={""}><b>frequent</b> </p>
                    <p className="cp_subtitle">weekly</p>
                </div>
            </div>
            <div>
                <div className="cp_radio_circle">
                    <input
                        type="radio"
                        name={"frequent"}
                        id={"constant"}
                        onChange={handleChange}
                        checked={([opt_filtered.frequent].includes("constant")) ? true : false}
                        disabled={(opt_filtered.power)==="none"?true:false}
                    />
                    <label htmlFor={"constant"} className={`cp_none ${(opt_filtered.power)!=="none" && 'cp_label_circle' } `} />
                </div>
                <div className={`cp_icon_item_container cp_column`}>
                    <p className={""}><b>constant</b> </p>
                    <p className="cp_subtitle">daily</p>
                </div>
            </div>
        </div>
    </div>
    )
}
