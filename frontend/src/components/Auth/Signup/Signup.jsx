import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import closeBtn from '/images/closeBtn.jpg';
import {useNavigate} from 'react-router-dom'
import signupCss from './Signup.module.css';

let Signup = ({ setAuth }) => {

    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            if(response.data){
                // setAuth({ closed: false, login: true, signup: false })
                setFormData({ fullName: '', email: '', phone: '', password: '' })

               navigate("/login")

            } // Log the response from the backend
            // Handle success, such as showing a success message to the user
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error, such as displaying an error message to the user
        }
    };

    let loginDiv = (
        <div className={signupCss.outerDiv}>
            <div className={signupCss.modal}>
                <div className={signupCss.header}>
                    <span className={signupCss.ttl}>Signup</span>
                    <span className={signupCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
                        <img className={signupCss.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <div className={signupCss.lgBox}>
                    <form onSubmit={handleSubmit}>
                        <input className={signupCss.inpBox} type="text" name="fullName" placeholder='Full Name ...' onChange={handleChange} />
                        <input className={signupCss.inpBox} type="email" name="email" placeholder='Email ...' onChange={handleChange} />
                        <input className={signupCss.inpBox} type="number" name="phone" placeholder='Mobile Number ...' onChange={handleChange} />
                        <input className={signupCss.inpBox} type="password" name="password" placeholder='Password ...' onChange={handleChange} />
                        <span className={signupCss.termsTxt}>
                            <input type="checkbox" name="accept" id="accept" className={signupCss.checkBox} />
                            <span>
                                I agree to Tadka's <a href="" className={signupCss.termaAnchor}>Terms of Service, Privacy Policy</a> and <a href="" className={signupCss.termaAnchor}>Content Policies</a>
                            </span>
                        </span>
                        <button type="submit" className={signupCss.btn}>Create Account</button>
                    </form>
                </div>
                
                <hr className={signupCss.break} />
                <div className={signupCss.newToZomato}>Already have an account? <div className={signupCss.createAcc} onClick={() => setAuth({ closed: false, login: true, signup: false })} >Log in</div></div>
            </div>
        </div>
    );
    return createPortal(loginDiv, document.getElementById('modal'));
}

export default Signup;
