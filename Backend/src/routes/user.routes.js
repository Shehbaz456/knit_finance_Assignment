import { Router } from "express";
const router = Router();
import { loginUser, logoutUser, registerUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateAccountDetails} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";



router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/refresh-token",refreshAccessToken);

// Protected Routes

router.post("/logout",verifyToken,logoutUser);
router.post("/change-password",verifyToken,changeCurrentPassword);
router.get("/current-user",verifyToken,getCurrentUser);
router.patch("/update-account",verifyToken,updateAccountDetails);

export default router;
