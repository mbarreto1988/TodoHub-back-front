import { getPool } from './pool.js';

(async () => {
  const pool = await getPool();
  const result = await pool.request().query('SELECT 1 AS ok');
  console.log(result.recordset);
})();
