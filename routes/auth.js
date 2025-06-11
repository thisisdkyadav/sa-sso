import express from "express"
import { loginWithGoogle, logout, redirect, verifySSOToken, getUser } from "../controllers/auth.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"

const router = express.Router()

router.post("/google", loginWithGoogle)
router.post("/logout", logout)
router.get("/redirect", isAuthenticated, redirect)
router.post("/verify-sso-token", verifySSOToken)
router.get("/user", isAuthenticated, getUser)

export default router
