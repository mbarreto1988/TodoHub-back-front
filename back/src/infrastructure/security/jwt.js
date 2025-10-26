import jwt from 'jsonwebtoken';
import { config } from '../../config/config.env.js';

export class JwtService {
  static generateAccessToken(payload) {
    return jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn,
    });
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: `${config.jwt.refreshExpiresDays}d`,
    });
  }

  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, config.jwt.accessSecret);
    } catch (err) {
        console.error(`Failed to jwt.verify : ${err}`)
        return null;
    }
  }

  static verifyRefreshToken(token) {
    try {
      return jwt.verify(token, config.jwt.refreshSecret);
    } catch (err) {
        console.error(`Failed to jwt.verify refresh : ${err}`)
      return null;
    }
  }
}
