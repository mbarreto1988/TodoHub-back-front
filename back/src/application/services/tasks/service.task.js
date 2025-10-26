import { TaskRepository } from "../../../infrastructure/repositories/tasks/mssql.task.repository.js";

export class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }


  async getAllTasks() {
    try {
      const tasks = await this.taskRepository.getAllTasks();
      return tasks.map((task) => ({
        id: task.Id,
        userId: task.UserId,
        title: task.Title,
        description: task.Description,
        isCompleted: Boolean(task.IsCompleted),
        createdAt: task.CreatedAt,
        updatedAt: task.UpdatedAt,
      }));
    } catch (error) {
      console.error('Error in TaskService.getAllTasks:', error.message);
      throw new Error('Error processing tasks');
    }
  }


  async getTaskById(taskId, userId) {
    try {
      const task = await this.taskRepository.getTaskById(taskId, userId);
      if (!task) {
        throw new Error('Task not found or unauthorized');
      }

      return {
        id: task.Id,
        userId: task.UserId,
        title: task.Title,
        description: task.Description,
        isCompleted: Boolean(task.IsCompleted),
        createdAt: task.CreatedAt,
        updatedAt: task.UpdatedAt,
      };
    } catch (error) {
      console.error('Error in TaskService.getTaskById:', error.message);
      throw new Error(error.message || 'Error retrieving task');
    }
  }


  async createTask(userId, title, description) {
    try {
      if (!title || title.trim() === '') {
        throw new Error('Title is required');
      }

      const newTask = await this.taskRepository.createTask(userId, title, description);
      return newTask;
    } catch (error) {
      console.error('Error in TaskService.createTask:', error.message);
      throw new Error(error.message || 'Error creating task');
    }
  }


  async updateTask(taskId, userId, title, description, isCompleted) {
    try {
      if (!title || !description || isCompleted === undefined) {
        throw new Error('All fields (title, description, isCompleted) are required');
      }

      const updatedTask = await this.taskRepository.updateTask(
        taskId,
        userId,
        title,
        description,
        isCompleted
      );

      if (!updatedTask) {
        throw new Error('Task not found or unauthorized');
      }

      return {
        id: updatedTask.Id,
        userId: updatedTask.UserId,
        title: updatedTask.Title,
        description: updatedTask.Description,
        isCompleted: Boolean(updatedTask.IsCompleted),
        createdAt: updatedTask.CreatedAt,
        updatedAt: updatedTask.UpdatedAt,
      };
    } catch (error) {
      console.error('Error in TaskService.updateTask:', error.message);
      throw new Error(error.message || 'Error updating task');
    }
  }


  async patchTask(taskId, userId, fieldsToUpdate) {
    try {
      if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
        throw new Error('No data provided for update');
      }

      const updatedTask = await this.taskRepository.patchTask(taskId, userId, fieldsToUpdate);
      if (!updatedTask) {
        throw new Error('Task not found or unauthorized');
      }

      return {
        id: updatedTask.Id,
        userId: updatedTask.UserId,
        title: updatedTask.Title,
        description: updatedTask.Description,
        isCompleted: Boolean(updatedTask.IsCompleted),
        createdAt: updatedTask.CreatedAt,
        updatedAt: updatedTask.UpdatedAt,
      };
    } catch (error) {
      console.error('Error in TaskService.patchTask:', error.message);
      throw new Error(error.message || 'Error patching task');
    }
  }
  

  async deleteTask(taskId, userId) {
    try {
      const deleted = await this.taskRepository.deleteTask(taskId, userId);
      if (!deleted) {
        throw new Error('Task not found or unauthorized');
      }

      return true;
    } catch (error) {
      console.error('Error in TaskService.deleteTask:', error.message);
      throw new Error(error.message || 'Error deleting task');
    }
  }
}