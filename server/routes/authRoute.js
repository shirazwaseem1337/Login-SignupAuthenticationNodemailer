const express = require("express")
const { registerController, loginController, testController, verifyController } = require("../controllers/authController")
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware")

// router object
const router = express.Router();


// routing
// Register
router.post("/register", registerController)
router.post("/login", loginController);
router.get("/test", requireSignin, isAdmin, testController);
router.get("/verify/:token", verifyController);



module.exports = router

// following mvc pattern so separate controller