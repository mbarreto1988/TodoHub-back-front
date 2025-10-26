import { getPool } from '../../db/mssql/pool.js';

export class UserRepository {
  async findByEmail(email) {
    try {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('Email', email)
        .query('SELECT * FROM dbo.Users WHERE Email = @Email');

      return result.recordset[0] || null;
    } catch (error) {
      console.error(' Error en UserRepository.findByEmail:', error.message);
      throw new Error('Error al buscar el usuario');
    }
  }


  async findByUsername(username) {
    try {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('Username', username)
        .query('SELECT * FROM dbo.Users WHERE Username = @Username');

      return result.recordset[0] || null;
    } catch (error) {
      console.error(' Error en UserRepository.findByUsername:', error.message);
      throw new Error('Error al buscar el usuario');
    }
  }
  

  async createUser(username, email, passwordHash) {
    try {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('Username', username)
        .input('Email', email)
        .input('PasswordHash', passwordHash)
        .query(`
          INSERT INTO dbo.Users (Username, Email, PasswordHash)
          VALUES (@Username, @Email, @PasswordHash);
          SELECT SCOPE_IDENTITY() AS Id;
        `);

      return { id: result.recordset[0].Id, username, email };
    } catch (error) {
      console.error(' Error en UserRepository.createUser:', error.message);
      throw new Error('Error al crear el usuario');
    }
  }
}
