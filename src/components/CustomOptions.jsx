

export const CustomOptions = ({ question, name, isIcon, options }) => {


    const onChange = ({target}) => {
        const data = {
            name: target.name,
            id: target.id
        }
         console.log(data)
    };

    return (
        <div className="rp_container_item_radio">

            <span className="cp_question">{question}</span>

            <div className="cp_grid">

                {
                    options.map((opt, index) => (
                        <div key={opt.name}>
                            <div className="cp_radio_circle">
                                <input type="radio" name={name} id={opt.name} onChange={onChange}/>
                                <label htmlFor={opt.name} className={` ${ (index===2) ?'cp_none' : 'cp_line'}  cp_label_circle`} />
                            </div>

                            <div className={`cp_icon_item_container ${(!isIcon) && "cp_column"}`}>
                                {
                                    (isIcon) ? <img src={opt.img_path} alt="img_path" /> : <b>{opt.name}</b>
                                }
                                <p className={` ${(!isIcon) && "cp_subtitle"}`}>{ (isIcon) ? <b>{opt.name}</b> : opt.subtitle}</p>
                            </div>
                        </div>
                    ))
                }



            </div>

        </div>
    )
}
