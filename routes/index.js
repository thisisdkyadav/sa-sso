import express from "express"
const router = express.Router()

// Import routes
import authRoutes from "./auth.js"

// Define routes
router.get("/status", (req, res) => {
  res.json({ status: "API is running" })
})

router.use("/auth", authRoutes)

export default router
