import React from 'react'
import { RadioButtons } from '../RadioButtons'

export const RecommendedProducts = () => {
    return (
        <div className="rp_container">
            <h2 className="rp_subtitle">Yo're an outdoor boss</h2>

            <div className="rp_container_options_radio">

                <RadioButtons
                    title="What is your preference for power"
                    name="power"
                    id={1}
                    optionThree="culpa"
                    optionTwo="nihil"
                    optionOne="est"
                    isIcon
                />
                <RadioButtons
                    title="What is your preference for power"
                    name="powerasdasda"
                    id="sss"
                    optionThree="voluptates"
                    optionTwo="modi"
                    optionOne="et"
                    text_ti="sint"
                />

                <RadioButtons
                    title="What is your preference for power"
                    name="powerasd"
                    id="544"
                    optionThree="lorem"
                    optionTwo="temporibus"
                    optionOne="sed"
                    text_ti="error"
                />

                {/* <div className="rp_container_item_radio">

                    <span className="question">What is your preference for power</span>

                    <div className="relative">

                        <div className="content">
                            <div className="input_label">
                                <input type="radio" name="power" id="1" />
                                <label htmlFor="1" className="line label" />
                            </div>

                            <div className="icon_item_container column">
                              
                                <p className="sub">Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>

                        <div className="content">
                            <div className="input_label">
                                <input type="radio" name="power" id="2" />
                                <label htmlFor="2" className="line label" />
                            </div>

                            <div className="icon_item_container column">
                                <b>Lorem, ipsum dolor.</b>
                                <p className="sub">Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>

                        <div className="content">
                            <div className="input_label">
                                <input type="radio" name="power" id="3" />
                                <label htmlFor="3" className="none label" />
                            </div>
                            <div className="icon_item_container column">
                                <b>Lorem, ipsum dolor.</b>
                                <p className="sub">Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>

                    </div>

                </div> */}


            </div>
        </div>
    )
}
