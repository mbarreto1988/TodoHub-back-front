import { TaskService } from "../../../application/services/tasks/service.task.js";

const taskService = new TaskService();

export class TaskController {
  static async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks();

      if (!tasks || tasks.length === 0) {
        return res.status(204).send();
      }

      return res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      console.error('Error in TaskController.getAllTasks:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal error retrieving tasks',
      });
    }
  }


  static async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: missing user info',
        });
      }

      const task = await taskService.getTaskById(id, userId);

      return res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      console.error('Error in TaskController.getTaskById:', error.message);
      return res.status(404).json({
        success: false,
        message: error.message || 'Task not found',
      });
    }
  }


  static async createTask(req, res) {
    try {
      const { title, description } = req.body;
      const userId = req.user?.userId; // From JWT middleware

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: missing user info',
        });
      }

      const task = await taskService.createTask(userId, title, description);

      return res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task,
      });
    } catch (error) {
      console.error('Error in TaskController.createTask:', error.message);
      return res.status(500).json({
        success: false,
        message: error.message || 'Error creating task',
      });
    }
  }


  static async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, isCompleted } = req.body;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: missing user info',
        });
      }

      const task = await taskService.updateTask(id, userId, title, description, isCompleted);

      return res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task,
      });
    } catch (error) {
      console.error('Error in TaskController.updateTask:', error.message);
      return res.status(400).json({
        success: false,
        message: error.message || 'Error updating task',
      });
    }
  }


  static async patchTask(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;
      const { title, description, isCompleted } = req.body;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: missing user info',
        });
      }

      const fieldsToUpdate = {};
      if (title !== undefined) fieldsToUpdate.Title = title;
      if (description !== undefined) fieldsToUpdate.Description = description;
      if (isCompleted !== undefined) fieldsToUpdate.IsCompleted = isCompleted;

      const updatedTask = await taskService.patchTask(id, userId, fieldsToUpdate);

      return res.status(200).json({
        success: true,
        message: 'Task updated successfully (partial)',
        data: updatedTask,
      });
    } catch (error) {
      console.error('Error in TaskController.patchTask:', error.message);
      return res.status(400).json({
        success: false,
        message: error.message || 'Error patching task',
      });
    }
  }


  static async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: missing user info',
        });
      }

      await taskService.deleteTask(id, userId);

      return res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
      });
    } catch (error) {
      console.error('Error in TaskController.deleteTask:', error.message);
      return res.status(404).json({
        success: false,
        message: error.message || 'Error deleting task',
      });
    }
  }
}