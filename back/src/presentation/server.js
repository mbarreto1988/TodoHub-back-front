/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { getPool } from '../infrastructure/db/mssql/pool.js';
import { authenticateToken } from '../infrastructure/middlewares/auth/auth.middleware.js';
import taskRouter from './routes/tasks/tasks.routes.js'
import authRouter from './routes/auth/auth.routes.js'


export async function startServer(port) {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Route base
  app.get('/', (req, res) => {
    res.send('Servidor corriendo correctamente 🚀');
  });

  // Health check (test DB)
  app.get('/health', async (req, res) => {
    try {
      const pool = await getPool();
      const result = await pool.request().query('SELECT 1 AS ok');
      res.status(200).json({
        status: 'ok',
        db: result.recordset[0].ok === 1 ? 'connected' : 'error',
        uptime: process.uptime().toFixed(2) + 's',
      });
    } catch (err) {
      res.status(500).json({ status: 'error', db: 'not connected', message: err.message });
    }
  });

  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/tasks', authenticateToken, taskRouter);

  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });
}
