import { useState } from "react";
import { createPortal } from 'react-dom';
import EnterOTP from '../../Auth/EnterOTP/EnterOTP';
import axios from "axios";

import gLogo from '/images/google.png';
import mailLogo from '/images/emailIcon.jpg';
import closeBtn from '/images/closeBtn.jpg';

import loginCss from './Login.module.css';

const Login = ({ setAuth, setLoggedIn }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const sendOtp = async () => {
        try {
            if (email === "") {
                setError("Enter Your Email!");
            } else if (!isValidEmail(email)) {
                setError("Enter Valid Email!");
            } else {
                const response = await axios.post("http://localhost:5000", { email });

                if (response.status === 200) {
                    setLoggedIn(true);
                } else {
                    setError(response.data.error);
                }
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    const loginDiv = (
        <div className={loginCss.outerDiv}>
            <div className={loginCss.modal}>
                <div className={loginCss.header}>
                    <span className={loginCss.ttl}>Login</span>
                    <span className={loginCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
                        <img className={loginCss.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <div className={loginCss.lgBox}>
                    <input className={loginCss.emailInp} type="email" placeholder='Email ...' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button className={isValidEmail(email) ? [loginCss.btn, loginCss.Sbtn].join(" ") : loginCss.btn} onClick={sendOtp}>Send OTP</button>
                </div>
                {error && <div className={loginCss.error}>{error}</div>}
                <hr className={loginCss.break} />
                <div className={loginCss.newToZomato}>New to Zomato? <div className={loginCss.createAcc} onClick={() => setAuth({ closed: false, login: false, signup: true })}>Create Account</div></div>
            </div>
        </div>
    );

    return createPortal(loginDiv, document.getElementById('modal'));
};

export default Login;
