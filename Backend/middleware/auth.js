import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive)
      return res.status(403).json({ error: "Access Denied" });
    req.user = user;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};

export default auth;
