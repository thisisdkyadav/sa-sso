export const isAuthenticated = (req, res, next) => {
  // check using session
  console.log(req.session)

  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  next()
}
