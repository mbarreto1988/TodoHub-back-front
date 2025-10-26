import { AuthService } from '../../../application/services/auth/service.auth.js';

const authService = new AuthService();

export class AuthController {
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username, email and password are required',
        });
      }

      const result = await authService.register({ username, email, password });

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      console.error('Error in AuthController.register:', error.message);
      return res.status(400).json({
        success: false,
        message: error.message || 'Error registering user',
      });
    }
  }
  

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required',
        });
      }

      const result = await authService.login(email, password);

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      console.error('Error in AuthController.login:', error.message);
      return res.status(401).json({
        success: false,
        message: error.message || 'Invalid credentials',
      });
    }
  }
}
