import { useState } from "react";
import { createPortal } from 'react-dom';
<<<<<<< HEAD
// import Spinner from 'react-bootstrap/Spinner';
=======
import EnterOTP from '../../Auth/EnterOTP/EnterOTP';
import axios from "axios";

>>>>>>> 90b592e4b0a2a6537eea23dd0194f97e82d683c4
import gLogo from '/images/google.png';
import mailLogo from '/images/emailIcon.jpg';
import closeBtn from '/images/closeBtn.jpg';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import loginCss from './Login.module.css';

<<<<<<< HEAD
// import EnterOTP from '../../Auth/EnterOTP/EnterOTP'

let Login = ({ setAuth, setLoggedIn }) => {
    const [email, setEmail] = useState();
    // const [spiner,setSpiner] = useState(false);
    const navigate = useNavigate();
    
=======
const Login = ({ setAuth, setLoggedIn }) => {
    const [email, setEmail] = useState("");
>>>>>>> 90b592e4b0a2a6537eea23dd0194f97e82d683c4
    const [error, setError] = useState("");

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
<<<<<<< HEAD
    const[otpModal,setOtpModal] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setError("Invalid email address");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/userOtpSend', { email });
            if (response.status === 200) {
                // Navigate to OTP component with email data
                navigate("/otp", { state: { email } });
=======

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
>>>>>>> 90b592e4b0a2a6537eea23dd0194f97e82d683c4
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
<<<<<<< HEAD
            <form onSubmit={handleLogin}>

            <div className={loginCss.lgBox}>
                <input className={loginCss.emailInp} type="email" placeholder='Email ...' value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <button type= "submit" className={isValidEmail(email) ? [loginCss.btn, loginCss.Sbtn].join(" ") : loginCss.btn} onClick={() => isValidEmail(email)}>Send OTP</button>
            </div>
            </form>
            {error && <div className={loginCss.error}>{error}</div>}
            <hr className={loginCss.break} />
            <div className={loginCss.newToZomato}>New to Tadka? <div className={loginCss.createAcc} onClick={() => setAuth({ closed: false, login: false, signup: true })}>Create Account</div></div>
=======
>>>>>>> 90b592e4b0a2a6537eea23dd0194f97e82d683c4
        </div>
    );

    return createPortal(loginDiv, document.getElementById('modal'));
};

export default Login;
