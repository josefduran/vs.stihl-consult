import { useState } from "react"
import { img_paths } from "../data/img"

const { arrow } = img_paths;

const initialState = {
    name: '',
    lastname: '',
    email: '',
    phone: ''
}

const initialStateAddress = {
    street: '',
    city: '',
    zip: '',
    state: '',
    country: 'US0'
}

export const RegistrationForm = () => {

    const [validFormMain, setValidFormMain] = useState(false)

    const [form, setForm] = useState(initialState);
    const { name, lastname, email, phone } = form;

    const [formAddress, setFormAddress] = useState(initialStateAddress)
    const { street, city, zip, state, country } = formAddress;


    const onChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    };

    const onChangeAddress = ({ target }) => {

        setFormAddress({
            ...formAddress,
            [target.name]: target.value
        })
    };

    const handleClickNext = () => {
        if ((name?.trim().length === 0) || (lastname?.trim().length === 0) || (email?.trim().length === 0) || (phone?.trim().length === 0)) return;
        setValidFormMain(true);
        console.log({ form })
    };

    const handleClickNextFinish = () => {
        console.log({formAddress, form})
    };

    return (
        <>
            {
                (!validFormMain) &&
                <div>
                    <div className="fm_content">
                        <label htmlFor="">First Name</label>

                        <input
                            type="text"
                            name="name"
                            className={`${(name?.trim().length === 0) && 'error_input_fm'}`}
                            value={name}
                            onChange={onChange}
                        />

                        {(name?.trim().length === 0) && <p className="error_fm">You must provide your first name</p>}
                    </div>
                    <div className="fm_content">
                        <label htmlFor="">Last Name</label>

                        <input
                            type="text"
                            name="lastname"
                            className={`${(lastname?.trim().length === 0) && 'error_input_fm'}`}
                            value={lastname}
                            onChange={onChange}
                        />

                        {(lastname?.trim().length === 0) && <p className="error_fm">You must provide your last name</p>}
                    </div>
                    <div className="fm_content">
                        <label htmlFor="">Email Address</label>

                        <input
                            type="email"
                            name="email"
                            className={`${(email?.trim().length === 0) && 'error_input_fm'}`}
                            value={email}
                            onChange={onChange}
                        />

                        {(email?.trim().length === 0) && <p className="error_fm">You must provide a valid email</p>}
                    </div>
                    <div className="fm_content">
                        <label htmlFor="">Phone Number</label>

                        <input
                            type="tel"
                            name="phone"
                            className={`${(phone?.trim().length === 0) && 'error_input_fm'}`}
                            value={phone}
                            onChange={onChange}
                        />

                        {(phone?.trim().length === 0) && <p className="error_fm">You must provide a valid phone number</p>}
                    </div>
                    <div className="container_btn_fm">
                        <button
                            onClick={handleClickNext}
                            disabled={(name?.trim().length === 0) || (lastname?.trim().length === 0) || (email?.trim().length === 0) || (phone?.trim().length === 0)}
                        >
                            <span>Next</span>
                            <img src={arrow} alt={arrow} />
                        </button>
                    </div>
                </div>
            }
            {
                (validFormMain) &&
                <div>
                    <div className="fm_content">
                        <label htmlFor="">Street Address</label>
                        <input
                            type="text"
                            name="street"
                            className={`${(street?.trim().length === 0) && 'error_input_fm'}`}
                            value={street}
                            onChange={onChangeAddress}
                        />
                        {(street?.trim().length === 0) && <p className="error_fm">You must provide your address</p>}
                    </div>
                    <div className="fm_content">
                        <label htmlFor="">City</label>
                        <input
                            type="text"
                            name="city"
                            className={`${(city?.trim().length === 0) && 'error_input_fm'}`}
                            value={city}
                            onChange={onChangeAddress}
                        />
                        {(city?.trim().length === 0) && <p className="error_fm">You must provide your city</p>}
                    </div>
                    <div className="fm_content">
                        <label htmlFor="">ZIP Code</label>
                        <input
                            type="text"
                            name="zip"
                            className={`${(zip?.trim().length === 0) && 'error_input_fm'}`}
                            value={zip}
                            onChange={onChangeAddress}
                        />
                        {(zip?.trim().length === 0) && <p className="error_fm">You must provide your zip code</p>}
                    </div>
                    <div className="fm_content">
                        <label htmlFor="">State</label>
                        <input
                            type="text"
                            name="state"
                            className={`${(state?.trim().length === 0) && 'error_input_fm'}`}
                            value={state}
                            onChange={onChangeAddress}
                        />
                        {(state?.trim().length === 0) && <p className="error_fm">You must provide your state</p>}
                    </div>

                    <div className="fm_content">
                        <label htmlFor="">Country</label>

                        <select name="country" id="" onChange={onChangeAddress} value={country}>
                            <option value="US0">United States</option>
                            <option value="US1">United States</option>
                            <option value="US2">United States</option>
                        </select>

                    </div>
                    <div className="container_btn_fm">
                        <button
                            onClick={handleClickNextFinish}
                            disabled={(street?.trim().length === 0) || (city?.trim().length === 0) || (zip?.trim().length === 0) || (state?.trim().length === 0)}
                        >
                            <span>Next</span>
                            <img src={arrow} alt={arrow} />
                        </button>
                    </div>

                </div>

            }

        </>
    )
}
