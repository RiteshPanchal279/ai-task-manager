import { Hono } from 'hono';
import { TaskService } from '../services/taskService';
import { AIService } from '../services/aiService';
import { authMiddleware } from '../middleware/auth';
import { successResponse, errorResponse } from '../utils/response';

type Variables = {
  userId: string;
};
const taskRoutes = new Hono<{ Variables: Variables }>();

// Apply auth middleware to all task routes
taskRoutes.use('*', authMiddleware);

taskRoutes.post('/generate', async (c) => {
  try {
    const { topic } = await c.req.json();
    const userId = c.get('userId');
    
    console.log("tpoic :",topic)
    if (!topic) {
      return errorResponse(c, 'Topic is required', 400);
    }
    
    const result = await AIService.generateTasks(userId, topic);
    return successResponse(c, result);
  } catch (error) {
    console.error('Generate tasks error:', error);
    return errorResponse(c, `Failed to generate tasks: ${error instanceof Error ? error.message : 'Unknown error'}`, 500);
  }
});

taskRoutes.get('/', async (c) => {
  try {
    const userId = c.get('userId');
    const category = c.req.query('category');
    const completed = c.req.query('completed');
    
    const completedFilter = completed !== undefined ? completed === 'true' : undefined;
    const tasks = await TaskService.getTasks(userId, category, completedFilter);
    
    return successResponse(c, tasks);
  } catch (error) {
    return errorResponse(c, 'Failed to fetch tasks');
  }
});

taskRoutes.post('/', async (c) => {
  try {
    const userId = c.get('userId');
    const taskData = await c.req.json();
    
    if (!taskData.title) {
      return errorResponse(c, 'Title is required', 400);
    }
    
    const task = await TaskService.createTask(userId, taskData);
    return successResponse(c, task);
  } catch (error) {
    return errorResponse(c, 'Failed to create task');
  }
});

taskRoutes.put('/:id', async (c) => {
  try {
    const userId = c.get('userId');
    const taskId = parseInt(c.req.param('id'));
    const taskData = await c.req.json();
    
    const updatedTask = await TaskService.updateTask(userId, taskId, taskData);
    
    if (!updatedTask) {
      return errorResponse(c, 'Task not found', 404);
    }
    
    return successResponse(c, updatedTask);
  } catch (error) {
    return errorResponse(c, 'Failed to update task');
  }
});

taskRoutes.delete('/:id', async (c) => {
  try {
    const userId = c.get('userId');
    const taskId = parseInt(c.req.param('id'));
    
    const deleted = await TaskService.deleteTask(userId, taskId);
    
    if (!deleted) {
      return errorResponse(c, 'Task not found', 404);
    }
    
    return successResponse(c, { message: 'Task deleted successfully' });
  } catch (error) {
    return errorResponse(c, 'Failed to delete task');
  }
});

export default taskRoutes;