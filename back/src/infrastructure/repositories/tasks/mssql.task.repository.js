import { getPool } from '../../db/mssql/pool.js';

export class TaskRepository {
  async getAllTasks() {
    try {
      const pool = await getPool();
      const result = await pool.request().query(`
        SELECT  Id, UserId, Title, Description, IsCompleted, CreatedAt, UpdatedAt
            FROM Tasks
            ORDER BY CreatedAt DESC;
      `);

      return result.recordset;
    } catch (error) {
      console.error(' Error in TaskRepository.getAllTasks:', error.message);
      throw new Error('Error getting tasks from the database');
    }
  }


    async getAllTasksByUserId(userId) {
    try {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('UserId', userId)
        .query(`
          SELECT 
            Id,
            UserId,
            Title,
            Description,
            IsCompleted,
            CreatedAt,
            UpdatedAt
          FROM dbo.Tasks
          WHERE UserId = @UserId
          ORDER BY CreatedAt DESC;
        `);

      return result.recordset;
    } catch (error) {
      console.error('❌ Error in TaskRepository.getAllTasksByUserId:', error.message);
      throw new Error('Error fetching tasks for user');
    }
  }

  


  async getTaskById(id, userId) {
    try {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('Id', id)
        .input('UserId', userId)
        .query(`
          SELECT Id, UserId, Title, Description, IsCompleted, CreatedAt, UpdatedAt
            FROM dbo.Tasks
            WHERE Id = @Id AND UserId = @UserId;
        `);

      return result.recordset[0] || null;
    } catch (error) {
      console.error('Error in TaskRepository.getTaskById:', error.message);
      throw new Error('Error retrieving task from database');
    }
  }


  async createTask(userId, title, description) {
    try {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('UserId', userId)
        .input('Title', title)
        .input('Description', description)
        .query(`
          INSERT INTO dbo.Tasks (UserId, Title, Description, IsCompleted)
          VALUES (@UserId, @Title, @Description, 0);
          SELECT SCOPE_IDENTITY() AS Id;
        `);

      return {
        id: result.recordset[0].Id,
        userId,
        title,
        description,
        isCompleted: false,
      };
    } catch (error) {
      console.error('Error in TaskRepository.createTask:', error.message);
      throw new Error('Error creating task in database');
    }
  }


  async updateTask(taskId, userId, title, description, isCompleted) {
    try {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('Id', taskId)
        .input('UserId', userId)
        .input('Title', title)
        .input('Description', description)
        .input('IsCompleted', isCompleted)
        .query(`
          UPDATE dbo.Tasks
          SET 
            Title = @Title,
            Description = @Description,
            IsCompleted = @IsCompleted,
            UpdatedAt = GETDATE()
          WHERE Id = @Id AND UserId = @UserId;

          SELECT Id, UserId, Title, Description, IsCompleted, CreatedAt, UpdatedAt
            FROM dbo.Tasks
            WHERE Id = @Id AND UserId = @UserId;
        `);

      return result.recordset[0] || null;
    } catch (error) {
      console.error('Error in TaskRepository.updateTask:', error.message);
      throw new Error('Error updating task in database');
    }
  }


  async patchTask(taskId, userId, fieldsToUpdate) {
    try {
      const pool = await getPool();

      // Build dynamic SET clause
      const updates = [];
      const request = pool.request();

      for (const [key, value] of Object.entries(fieldsToUpdate)) {
        // Only allow valid columns
        if (['Title', 'Description', 'IsCompleted'].includes(key)) {
          updates.push(`${key} = @${key}`);
          request.input(key, value);
        }
      }

      if (updates.length === 0) {
        throw new Error('No valid fields to update');
      }

      request.input('Id', taskId);
      request.input('UserId', userId);

      const query = `
        UPDATE dbo.Tasks
        SET ${updates.join(', ')}, UpdatedAt = GETDATE()
        WHERE Id = @Id AND UserId = @UserId;

        SELECT  Id, UserId, Title, Description, IsCompleted, CreatedAt, UpdatedAt
          FROM dbo.Tasks
          WHERE Id = @Id AND UserId = @UserId;
      `;

      const result = await request.query(query);
      return result.recordset[0] || null;
    } catch (error) {
      console.error('Error in TaskRepository.patchTask:', error.message);
      throw new Error('Error patching task in database');
    }
  }
  

  async deleteTask(taskId, userId) {
    try {
      const pool = await getPool();
      const result = await pool
        .request()
        .input('Id', taskId)
        .input('UserId', userId)
        .query(`
          DELETE FROM dbo.Tasks
          WHERE Id = @Id AND UserId = @UserId;

          SELECT @@ROWCOUNT AS affectedRows;
        `);

      return result.recordset[0].affectedRows > 0;
    } catch (error) {
      console.error('Error in TaskRepository.deleteTask:', error.message);
      throw new Error('Error deleting task from database');
    }
  }
}
