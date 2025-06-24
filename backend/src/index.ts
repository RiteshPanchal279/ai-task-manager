import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';
import userRoutes from './routes/users';
import taskRoutes from './routes/tasks';
import statsRoutes from './routes/stats';
import dotenv from 'dotenv';

dotenv.config();
const app = new Hono();
// Middleware
app.use('*', cors());
app.use('*', logger());

// Routes
app.get('/', (c) => {
  return c.json({ message: 'Task Manager API' });
});

app.route('/users', userRoutes);
app.route('/tasks', taskRoutes);
app.route('/generate-tasks', taskRoutes); // For backward compatibility
app.route('/stats', statsRoutes);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});