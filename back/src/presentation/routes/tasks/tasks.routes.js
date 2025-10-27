import { Router } from "express";
import { TaskController } from "../../controllers/tasks/tasks.controller.js";

const router = Router();

router.get('/', TaskController.getUserTasks);
router.get('/all', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.patch('/:id', TaskController.patchTask);
router.delete('/:id', TaskController.deleteTask);

export default router;