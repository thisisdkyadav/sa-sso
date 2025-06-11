import { OAuth2Client } from "google-auth-library"
import dotenv from "dotenv"
import { generateToken, verifyToken } from "../utils/tokenHelper.js"

dotenv.config()

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)

export const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  })
  const payload = ticket.getPayload()
  return payload
}

export const loginWithGoogle = async (req, res) => {
  const { token } = req.body
  try {
    const payload = await verifyGoogleToken(token)

    const user = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    }

    req.session.user = user

    res.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Google authentication error:", error)
    res.status(401).json({ error: "Invalid Google token" })
  }
}

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" })
    }
    res.json({ success: true })
  })
}

export const redirect = async (req, res) => {
  const redirectTo = req.query.redirect_to

  if (!redirectTo) {
    return res.status(400).json({ error: "Missing redirect_to parameter" })
  }
  const token = generateToken(req.session.user)

  const redirectUrl = new URL(redirectTo)
  redirectUrl.searchParams.append("token", token)

  res.redirect(redirectUrl.toString())
}

export const verifySSOToken = async (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(400).json({
      success: false,
      error: "Token is required",
    })
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    })
  }

  return res.json({
    success: true,
    user: { email: decoded.email },
  })
}

export const getUser = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not authenticated" })
  }
  res.json({ user: req.session.user })
}
