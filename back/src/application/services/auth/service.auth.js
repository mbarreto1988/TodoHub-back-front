import bcrypt from 'bcrypt';
import { UserRepository } from '../../../infrastructure/repositories/users/mssql.user.repository.js';
import { JwtService } from '../../../infrastructure/security/jwt.js';

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register({ username, email, password }) {
    try {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error('Email is already registered');
      }
    
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Create user
      const user = await this.userRepository.createUser(username, email, passwordHash);

      // Generate tokens
      const payload = { userId: user.id, username: user.username };
      const accessToken = JwtService.generateAccessToken(payload);
      const refreshToken = JwtService.generateRefreshToken(payload);

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error('Error in AuthService.register:', error.message);
      throw new Error(error.message || 'Error registering user');
    }
  }

  async login(email, password) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.PasswordHash);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate tokens
      const payload = { userId: user.Id, username: user.Username };
      const accessToken = JwtService.generateAccessToken(payload);
      const refreshToken = JwtService.generateRefreshToken(payload);

      return {
        user: {
          id: user.Id,
          username: user.Username,
          email: user.Email,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error('Error in AuthService.login:', error.message);
      throw new Error(error.message || 'Error during login');
    }
  }
}
