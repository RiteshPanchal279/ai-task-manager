import { Hono } from 'hono';
import { UserService } from '../services/userService';
import { successResponse, errorResponse } from '../utils/response';

const userRoutes = new Hono();

userRoutes.post('/', async (c) => {
  try {
    const userData = await c.req.json();
    const user = await UserService.createOrGetUser(userData);
    return successResponse(c, user);
  } catch (error) {
    return errorResponse(c, 'Failed to create user');
  }
});

export default userRoutes;