// import {useState} from "react";
// import { createPortal } from 'react-dom';

// import gLogo from '/images/google.png';
// import mailLogo from '/images/emailIcon.jpg';
// import closeBtn from '/images/closeBtn.jpg';

// import loginCss from './Login.module.css';

// import EnterOTP from '../../Auth/EnterOTP/EnterOTP'

// let Login = ({ setAuth, setLoggedIn }) => {
//     const [phone, setPhone] = useState();

//     let [otpModal, setOTPModal] = useState(false)

//     let loginDiv = !otpModal ? <div className={loginCss.outerDiv}>
//         <div className={loginCss.modal}>
//             <div className={loginCss.header}>
//                 <span className={loginCss.ttl}>Login</span>
//                 <span className={loginCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
//                     <img className={loginCss.closeBtnImg} src={closeBtn} alt="close button" />
//                 </span>
//             </div>
//             <div className={loginCss.lgBox}>
//                 <input className={loginCss.phoneInp} type="tel" placeholder='Phone number ...' onChange={(e) => setPhone(e.target.value)} />
//                 <button  className={phone?.length === 10 ? [loginCss.btn, loginCss.Sbtn].join(" ") : loginCss.btn} onClick={()=> phone?.length === 10 ? setOTPModal(true) : ""}>Send OTP</button>
//             </div>
//             <div className={loginCss.orBreak}><span className={loginCss.orBreakText}>or</span></div>
//             <div className={loginCss.socialSignupBox}>
//                 <img className={loginCss.icon} src={mailLogo} alt="email signup" />
//                 Continue with Email
//             </div>
//             <div className={loginCss.socialSignupBox}>
//                 <img className={loginCss.icon} src={gLogo} alt="google signup" />
//                 Continue with Google
//             </div>
//             <hr className={loginCss.break} />
//             <div className={loginCss.newToZomato}>New to Zomato? <div className={loginCss.createAcc} onClick={() => setAuth({ closed: false, login: false, signup: true })}>Create Account</div></div>
//         </div>
//     </div> :  <EnterOTP setModal={setOTPModal} setLoggedIn={setLoggedIn} setAuth={setAuth} />
//     return createPortal(loginDiv, document.getElementById('modal'));
// }

// export default Login;

// import { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import closeBtn from '/images/closeBtn.jpg';
// import EnterOTP from '../../Auth/EnterOTP/EnterOTP';

// import loginCss from './Login.module.css';

// const Login = ({ setAuth, setLoggedIn }) => {
//     const [email, setEmail] = useState("");
//     const [otpModal, setOTPModal] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:5000/api/login", { email });
//             toast.success('OTP sent successfully!', { autoClose: 5000 });
//             setOTPModal(true); // Open OTP modal after sending OTP
//         } catch (error) {
//             toast.error('Failed to send OTP!', { autoClose: 5000 });
//         }
//     }

//     return (
//         <>
//             <ToastContainer />
//             <div className={loginCss.outerDiv}>
//                 <div className={loginCss.modal}>
//                     <div className={loginCss.header}>
//                         <span className={loginCss.ttl}>Login</span>
//                         <span className={loginCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
//                             <img className={loginCss.closeBtnImg} src={closeBtn} alt="close button" />
//                         </span>
//                     </div>
//                     <div className={loginCss.lgBox}>
//                         <input className={loginCss.emailInp} type="email" placeholder='Enter Your Email Id' onChange={(e) => setEmail(e.target.value)} />
//                         <button className={loginCss.btn} onClick={handleSubmit}>Send OTP</button>
//                     </div>
//                     <hr className={loginCss.break} />
//                     <div className={loginCss.newToZomato}>New to Zomato? <div className={loginCss.createAcc} onClick={() => setAuth({ closed: false, login: false, signup: true })}>Create Account</div></div>
//                 </div>
//             </div>
//             {otpModal && <EnterOTP setModal={setOTPModal} setLoggedIn={setLoggedIn} />}
//         </>
//     );
// }

// export default Login;
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import closeBtn from '/images/closeBtn.jpg';
import EnterOTP from '../../Auth/EnterOTP/EnterOTP';

import css from './Login.module.css';

const Login = ({ setAuth, setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpModal, setOTPModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/login', { email });
            toast.success('OTP sent successfully!', { autoClose: 5000 });
            setOTPModal(true); // Open OTP modal after sending OTP
        } catch (error) {
            toast.error('Failed to send OTP!', { autoClose: 5000 });
        }
    };

    const verifyOTP = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify', { email, otp });
            if (response.data.success) {
                setLoggedIn(true);
                setAuth(false);
                localStorage.setItem('auth', true);
            } else {
                toast.error('Invalid OTP!', { autoClose: 5000 });
            }
        } catch (error) {
            toast.error('Failed to verify OTP!', { autoClose: 5000 });
        }
    };

    return (
        <>
            <ToastContainer />
            {createPortal(
                !otpModal ? (
                    <div className={css.outerDiv}>
                        <div className={css.modal}>
                            <div className={css.header}>
                                <span className={css.ttl}>Login</span>
                                <span className={css.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
                                    <img className={css.closeBtnImg} src={closeBtn} alt="close button" />
                                </span>
                            </div>
                            <div className={css.lgBox}>
                                <input className={css.emailInp} type="email" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
                                <button className={css.btn} onClick={handleSubmit}>
                                    Send OTP
                                </button>
                            </div>
                            <hr className={css.break} />
                            <div className={css.newToZomato}>
                                New to Zomato?{' '}
                                <div className={css.createAcc} onClick={() => setAuth({ closed: false, login: false, signup: true })}>
                                    Create Account
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <EnterOTP setModal={setOTPModal} setLoggedIn={setLoggedIn} setAuth={setAuth} setEmail={setEmail} setOtp={setOtp} verifyOTP={verifyOTP} />
                ),
                document.getElementById('modal')
            )}
        </>
    );
};

export default Login;
