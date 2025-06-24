import { Context } from 'hono';

export const successResponse = (c: Context, data: any, status = 200) => {
  return c.json({data, status});
};

export const errorResponse = (c: Context, message: string, status = 500) => {
  return c.json({ error: message }, {status:500});
};