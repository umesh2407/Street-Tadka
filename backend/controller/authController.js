import User from "../models/userSchema.js";
import { comparePassword, hashPassword } from "../helper/authhelper.js";
import nodemailer from "nodemailer";
import JWT from "jsonwebtoken";
import userotp from "../models/userOtp.js";
export const registerController = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;
        //validations
        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ error: "FullName, email, phone, and password are required" });
        }
       
        //check user
        const existingUser = await User.findOne({ email });
        //existing user
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please log in.",
            });
        }
       
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new User({
            fullName,
            email,
         phone,
            password: hashedPassword,
        }).save();
    
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};

// Add other controller functions like loginController, testController, etc.
// export const loginController = async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ error: "Please provide your email address" });
//     }

//     try {
//         // Check if the user exists
//         const existingUser = await User.findOne({ email });

//         if (!existingUser) {
//             return res.status(400).json({ error: "User not found" });
//         }

//         // Generate OTP
//         const OTP = Math.floor(100000 + Math.random() * 900000);

//         // Save or update OTP in the database
//         await userotp.findOneAndUpdate(
//             { email },
//             { otp: OTP },
//             { upsert: true, new: true }
//         );

//         // Create email transport
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.PASSWORD,
//             },
//         });

//         // Compose email message
//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: email,
//             subject: "Sending Email For OTP Validation",
//             text: `Your OTP for verification is: ${OTP}`,
//         };

//         // Send email
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log("Error sending email:", error);
//                 return res.status(500).json({ error: "Failed to send OTP via email" });
//             } else {
//                 console.log("Email sent:", info.response);
//                 return res.status(200).json({ message: "OTP sent successfully via email" });
//             }
//         });
//     } catch (error) {
//         console.log("Error:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// }
// export const userOtpSend = async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         res.status(400).json({ error: "Please Enter Your Email" })
//     }


//     try {
//         const presuer = await User.findOne({ email: email });

//         if (presuer) {
//             const OTP = Math.floor(100000 + Math.random() * 900000);

//             const existEmail = await userotp.findOne({ email: email });


//             if (existEmail) {
//                 const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
//                     otp: OTP
//                 }, { new: true }
//                 );
//                 await updateData.save();

//                 const mailOptions = {
//                     from: process.env.EMAIL,
//                     to: email,
//                     subject: "Sending Eamil For Otp Validation",
//                     text: `OTP:- ${OTP}`
//                 }

//                 const transporter = nodemailer.createTransport({
//                                 service: "gmail",
//                                 auth: {
//                                     user: process.env.EMAIL,
//                                     pass: process.env.PASSWORD,
//                                 },
//                             });
//                 tarnsporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         console.log("error", error);
//                         res.status(400).json({ error: "email not send" })
//                     } else {
//                         console.log("Email sent", info.response);
//                         res.status(200).json({ message: "Email sent Successfully" })
//                     }
//                 })

//             } else {

//                 const saveOtpData = new userotp({
//                     email, otp: OTP
//                 });

//                 await saveOtpData.save();
//                 const mailOptions = {
//                     from: process.env.EMAIL,
//                     to: email,
//                     subject: "Sending Eamil For Otp Validation",
//                     text: `OTP:- ${OTP}`
//                 }

//                 tarnsporter.sendMail(mailOptions, (error, info) => {
//                     if (error) {
//                         console.log("error", error);
//                         res.status(400).json({ error: "email not send" })
//                     } else {
//                         console.log("Email sent", info.response);
//                         res.status(200).json({ message: "Email sent Successfully" })
//                     }
//                 })
//             }
//         } else {
//             res.status(400).json({ error: "This User Not Exist In our Db" })
//         }
//     } catch (error) {
//         res.status(400).json({ error: "Invalid Details", error })
//     }
// };


// export const userLogin = async(req,res)=>{
//     const {email,otp} = req.body;

//     if(!otp || !email){
//         res.status(400).json({ error: "Please Enter Your OTP and email" })
//     }

//     try {
//         const otpverification = await userotp.findOne({email:email});

//         if(otpverification.otp === otp){
//             const preuser = await users.findOne({email:email});

//             // token generate
//             const token = await preuser.generateAuthtoken();
//            res.status(200).json({message:"User Login Succesfully Done",userToken:token});

//         }else{
//             res.status(400).json({error:"Invalid Otp"})
//         }
//     } catch (error) {
//         res.status(400).json({ error: "Invalid Details", error })
//     }
// }
export const userOtpSend = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Please Enter Your Email" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "This User Does Not Exist" });
        }

        const OTP = Math.floor(100000 + Math.random() * 900000);
        let userOtp = await userotp.findOne({ email });

        if (userOtp) {
            userOtp.otp = OTP;
        } else {
            userOtp = new UserOTP({ email, otp: OTP });
        }

        await userOtp.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email For OTP Validation",
            text: `OTP:- ${OTP}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error", error);
                return res.status(400).json({ error: "Email not sent" });
            } else {
                console.log("Email sent", info.response);
                return res.status(200).json({ message: "Email sent successfully" });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const userLogin = async (req, res) => {
    const { email, otp } = req.body;

    if (!otp || !email) {
        return res.status(400).json({ error: "Please Enter Your OTP and Email" });
    }

    try {
        const otpVerification = await userotp.findOne({ email });

        if (!otpVerification || otpVerification.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "This User Does Not Exist" });
        }

        // Generate token or perform any other necessary action for user login
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

        return res.status(200).json({ message: "User Login Successful", userToken: token });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};