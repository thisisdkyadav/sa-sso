import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || "student-affairs-secret-key"
const TOKEN_EXPIRY = "50m" // 5 minutes

/**
 * Generate a JWT token for SSO
 * @param {Object} payload - Payload object containing email, iat, and exp
 * @returns {String} JWT token
 */
export const generateToken = (payload) => {
  console.log(payload, "kjuhytre")

  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY })
}

/**
 * Verify a JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token payload or null if invalid
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}
