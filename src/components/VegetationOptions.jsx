
import { useFiltered } from "../hook/useFiltered";

export const VegetationOptions = () => {

    const { handleChange, opt_filtered } = useFiltered()

    return (
        <>
            
            <div className="rp_container_item_radio" >
                <span className="cp_question">How heavy is the vegetation on your property</span>
                <div className="cp_grid">
                    <div> 
                        <div className="cp_radio_circle">
                            <input
                                type="radio"
                                name={"vegetation"}
                                id={"light"}
                                onChange={handleChange}
                                checked={([opt_filtered.vegetation].includes("light")) ? true : false}
                            />
                            <label htmlFor={"light"} className={`cp_line cp_label_circle`} />
                        </div>
                        <div className={`cp_icon_item_container cp_column`}>
                            <p><b>light</b> </p>
                            <p className="cp_subtitle">once or Twice/month</p>
                        </div>
                    </div>
                    <div>
                        <div className="cp_radio_circle">
                            <input
                                type="radio"
                                name={"vegetation"}
                                id={"medium"}
                                onChange={handleChange}
                                checked={([opt_filtered.vegetation].includes("medium")) ? true : false}
                            />
                            <label htmlFor={"medium"} className={`cp_line cp_label_circle`} />
                        </div>
                        <div className={`cp_icon_item_container cp_column`}>
                            <p className={""}><b>medium</b> </p>
                            <p className="cp_subtitle">weekly</p>
                        </div>
                    </div>
                    <div>
                        <div className="cp_radio_circle">
                            <input
                                type="radio"
                                name={"vegetation"}
                                id={"heavy"}
                                onChange={handleChange}
                                checked={([opt_filtered.vegetation].includes("heavy")) ? true : false}
                            />
                            <label htmlFor={"heavy"} className={`cp_none cp_label_circle`} />
                        </div>
                        <div className={`cp_icon_item_container cp_column`}>
                            <p className={""}><b>heavy</b> </p>
                            <p className="cp_subtitle">daily</p>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}
