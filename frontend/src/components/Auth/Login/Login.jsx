import {useState} from "react";
import { createPortal } from 'react-dom';

import gLogo from '/images/google.png';
import mailLogo from '/images/emailIcon.jpg';
import closeBtn from '/images/closeBtn.jpg';

import loginCss from './Login.module.css';

import EnterOTP from '../../Auth/EnterOTP/EnterOTP'

let Login = ({ setAuth, setLoggedIn }) => {
    const [phone, setPhone] = useState();

    let [otpModal, setOTPModal] = useState(false)

    let loginDiv = !otpModal ? <div className={loginCss.outerDiv}>
        <div className={loginCss.modal}>
            <div className={loginCss.header}>
                <span className={loginCss.ttl}>Login</span>
                <span className={loginCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
                    <img className={loginCss.closeBtnImg} src={closeBtn} alt="close button" />
                </span>
            </div>
            <div className={loginCss.lgBox}>
                <input className={loginCss.phoneInp} type="tel" placeholder='Phone number ...' onChange={(e) => setPhone(e.target.value)} />
                <button  className={phone?.length === 10 ? [loginCss.btn, loginCss.Sbtn].join(" ") : loginCss.btn} onClick={()=> phone?.length === 10 ? setOTPModal(true) : ""}>Send OTP</button>
            </div>
            <div className={loginCss.orBreak}><span className={loginCss.orBreakText}>or</span></div>
            <div className={loginCss.socialSignupBox}>
                <img className={loginCss.icon} src={mailLogo} alt="email signup" />
                Continue with Email
            </div>
            <div className={loginCss.socialSignupBox}>
                <img className={loginCss.icon} src={gLogo} alt="google signup" />
                Continue with Google
            </div>
            <hr className={loginCss.break} />
            <div className={loginCss.newToZomato}>New to Zomato? <div className={loginCss.createAcc} onClick={() => setAuth({ closed: false, login: false, signup: true })}>Create Account</div></div>
        </div>
    </div> :  <EnterOTP setModal={setOTPModal} setLoggedIn={setLoggedIn} setAuth={setAuth} />
    return createPortal(loginDiv, document.getElementById('modal'));
}

export default Login
// import React, { useState } from 'react'
// import { NavLink, useNavigate } from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify';
// // import { sentOtpFunction } from "../services/Apis";
// // import Spinner from 'react-bootstrap/Spinner';
// import "../styles/mix.css"

// // const Login = () => {

// //     const [email, setEmail] = useState("");
// //     const [spiner,setSpiner] = useState(false);

// //     const navigate = useNavigate();



// //     // sendotp
// //     const sendOtp = async (e) => {
// //         e.preventDefault();

// //         if (email === "") {
// //             toast.error("Enter Your Email !")
// //         } else if (!email.includes("@")) {
// //             toast.error("Enter Valid Email !")
// //         } else {
// //             setSpiner(true)
// //             const data = {
// //                 email: email
// //             }

// //             const response = await sentOtpFunction(data);

// //             if (response.status === 200) {
// //                 setSpiner(false)
// //                 navigate("/user/otp",{state:email})
// //             } else {
// //                 toast.error(response.response.data.error);
// //             }
// //         }
// //     }

// //     return (
// //         <>
// //             <section>
// //                 <div className="form_data">
// //                     <div className="form_heading">
// //                         <h1>Welcome Back, Log In</h1>
// //                         <p>Hi, we are you glad you are back. Please login.</p>
// //                     </div>
// //                     <form>
// //                         <div className="form_input">
// //                             <label htmlFor="email">Email</label>
// //                             <input type="email" name="email" id="" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address' />
// //                         </div>
// //                         <button className='btn' onClick={sendOtp}>Login
// //                         {
// //                             spiner ? <span><Spinner animation="border" /></span>:""
// //                         }
// //                         </button>
// //                         <p>Don't have and account <NavLink to="/register">Sing up</NavLink> </p>
// //                     </form>
// //                 </div>
// //                 <ToastContainer />
// //             </section>
// //         </>
// //     )
// // }

// // export default Login