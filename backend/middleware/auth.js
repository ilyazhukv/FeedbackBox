import JWT from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token format is Bearer <token>" });

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

export default authMiddleware;