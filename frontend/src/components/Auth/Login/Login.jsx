import {useState} from "react";
import { createPortal } from 'react-dom';
// import Spinner from 'react-bootstrap/Spinner';
import gLogo from '/images/google.png';
import mailLogo from '/images/emailIcon.jpg';
import closeBtn from '/images/closeBtn.jpg';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import loginCss from './Login.module.css';

// import EnterOTP from '../../Auth/EnterOTP/EnterOTP'

let Login = ({ setAuth, setLoggedIn }) => {
    const [email, setEmail] = useState();
    // const [spiner,setSpiner] = useState(false);
    const navigate = useNavigate();
    
    const [error, setError] = useState("");
    const isValidEmail = (email) => {
        // Regular expression for validating email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
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
            }
        } catch (error) {
            setError(error.response.data.error);
        }
    };
    

//     let loginDiv = !otpModal ? <div className={loginCss.outerDiv}>
//         <div className={loginCss.modal}>
//             <div className={loginCss.header}>
//                 <span className={loginCss.ttl}>Login</span>
//                 <span className={loginCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
//                     <img className={loginCss.closeBtnImg} src={closeBtn} alt="close button" />
//                 </span>
//             </div>
//             <div className={loginCss.lgBox}>
//                 <input className={loginCss.emailInp} type="email" placeholder='Email ...' onChange={(e) => setEmail(e.target.value)} />
//                 {/* <button  className={email?.length === 10 ? [loginCss.btn, loginCss.Sbtn].join(" ") : loginCss.btn} onClick={()=> email?.length === 10 ? setOTPModal(true) : ""}>Send OTP</button> */}
//                 <button className={isValidEmail(email) ? [loginCss.btn, loginCss.Sbtn].join(" ") : loginCss.btn} onClick={() => isValidEmail(email) ? setOTPModal(true) : ""}>Send OTP</button>
//             </div>
//             {/* <div className={loginCss.orBreak}><span className={loginCss.orBreakText}>or</span></div>
//             <div className={loginCss.socialSignupBox}>
//                 <img className={loginCss.icon} src={mailLogo} alt="email signup" />
//                 Continue with Email
//             </div>
//             <div className={loginCss.socialSignupBox}>
//                 <img className={loginCss.icon} src={gLogo} alt="google signup" />
//                 Continue with Google
//             </div> */}
//             <hr className={loginCss.break} />
//             <div className={loginCss.newToZomato}>New to Zomato? <div className={loginCss.createAcc} onClick={() => setAuth({ closed: false, login: false, signup: true })}>Create Account</div></div>
//         </div>
//     </div> :  <EnterOTP setModal={setOTPModal} setLoggedIn={setLoggedIn} setAuth={setAuth} />
//     return createPortal(loginDiv, document.getElementById('modal'));
// }

// export default Login
let loginDiv = !otpModal ? (
    <div className={loginCss.outerDiv}>
        <div className={loginCss.modal}>
            <div className={loginCss.header}>
                <span className={loginCss.ttl}>Login</span>
                <span className={loginCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
                    <img className={loginCss.closeBtnImg} src={closeBtn} alt="close button" />
                </span>
            </div>
            <form onSubmit={handleLogin}>

            <div className={loginCss.lgBox}>
                <input className={loginCss.emailInp} type="email" placeholder='Email ...' value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <button type= "submit" className={isValidEmail(email) ? [loginCss.btn, loginCss.Sbtn].join(" ") : loginCss.btn} onClick={() => isValidEmail(email)}>Send OTP</button>
            </div>
            </form>
            {error && <div className={loginCss.error}>{error}</div>}
            <hr className={loginCss.break} />
            <div className={loginCss.newToZomato}>New to Tadka? <div className={loginCss.createAcc} onClick={() => setAuth({ closed: false, login: false, signup: true })}>Create Account</div></div>
        </div>
    </div>
) : (
    <EnterOTP setModal={setOTPModal} setLoggedIn={setLoggedIn} setAuth={setAuth} />
);

return createPortal(loginDiv, document.getElementById('modal'));
};

export default Login;