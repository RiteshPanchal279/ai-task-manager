import { Context, Next } from 'hono';

export const authMiddleware = async (c: Context, next: Next) => {
  const clerkUserId = c.req.header('x-clerk-user-id');
  if (!clerkUserId) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  c.set('userId', clerkUserId);
  await next();
};