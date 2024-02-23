import express from 'express';
import { registerController , userOtpSend, userLogin} from '../controller/authController.js';


const router = express.Router();

// Register route
router.post("/register", registerController);

// Login route

router.post("/userOtpSend", userOtpSend);
router.post("/userLogin", userLogin); 
// router.post("/login", loginController);

// // Test route (Example of protected route)
// router.get("/test", requireSignIn, isAdmin, testController);

export default router;
