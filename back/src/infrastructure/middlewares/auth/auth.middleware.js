import { JwtService } from "../../security/jwt.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Expected format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  const decoded = JwtService.verifyAccessToken(token);

  if (!decoded) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }

  // Attach user info to request for future use
  req.user = decoded;
  next();
}
