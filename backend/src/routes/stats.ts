import { Hono } from 'hono';
import { TaskService } from '../services/taskService';
import { authMiddleware } from '../middleware/auth';
import { successResponse, errorResponse } from '../utils/response';
type Variables = {
  userId: string;
};
const statsRoutes = new Hono<{ Variables: Variables }>();

statsRoutes.use('*', authMiddleware);

statsRoutes.get('/', async (c) => {
  try {
    const userId = c.get('userId');
    const stats = await TaskService.getTaskStats(userId);
    return successResponse(c, stats);
  } catch (error) {
    return errorResponse(c, 'Failed to fetch stats');
  }
});

export default statsRoutes;