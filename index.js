import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import session from "express-session"
import apiRoutes from "./routes/index.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()
app.use(cookieParser())
app.set("trust proxy", 1)
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : ["http://localhost:5174", "http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.SESSION_SECRET || "student-affairs-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
      path: "/",
    },
  })
)

app.use(express.static(path.join(__dirname, "public")))

app.use("/api", apiRoutes)

app.use("/", (req, res) => {
  res.send("Hello World!2")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
