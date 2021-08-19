

export const RadioButtons = ({ question, name, isIcon, options }) => {


    const onChange = ({target}) => {
        const data = {
            name: target.name,
            id: target.id
        }
         console.log(data)
    };

    return (
        <div className="rp_container_item_radio">

            <span className="question">{question}</span>

            <div className="relative">

                {
                    options.map((opt, index) => (
                        <div className="content" key={opt.name}>
                            <div className="input_label">
                                <input type="radio" name={name} id={opt.name} onChange={onChange}/>
                                <label htmlFor={opt.name} className={` ${ (index===2) ?'none' : 'line'}  label`} />
                            </div>

                            <div className={`icon_item_container ${(!isIcon) && "column"}`}>
                                {
                                    (isIcon) ? <img src={opt.img_path} alt="fas" /> : <b>{opt.name}</b>
                                }
                                <p className={` ${(!isIcon) && "sub"}`}>{ (isIcon) ? <b>{opt.name}</b> : opt.subtitle}</p>
                            </div>
                        </div>
                    ))
                }



            </div>

        </div>
    )
}
