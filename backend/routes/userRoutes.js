import express from "express";
import path from "path";
import { requestPasswordReset, verifyEmail, getUser, updateUser } from "../controllers/userController.js";
import { resetPassword, changePassword } from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";


const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);

router.post("/request-resetpassword", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", changePassword);

// user routes
router.get("/get-user/:id?", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});

router.get("/resetpassword", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});

export default router;