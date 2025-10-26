/* eslint-disable no-undef */
import { config } from './config/config.env.js';
import { startServer } from './presentation/server.js';

(async () => {
  try {
    await startServer(config.app.port);
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error.message);
    process.exit(1);
  }
})();

