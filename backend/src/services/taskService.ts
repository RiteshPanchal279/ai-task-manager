import { db } from '../config/database';
import { tasks } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { Task, TaskStats } from '../types';

export class TaskService {
  static async getTasks(userId: string, category?: string, completed?: boolean) {
    // Build conditions array
    const conditions = [eq(tasks.userId, userId)];
    
    if (category) {
      conditions.push(eq(tasks.category, category));
    }
    
    if (completed !== undefined) {
      conditions.push(eq(tasks.completed, completed));
    }
    
    // Combine all conditions with AND
    const whereClause = conditions.length === 1 
      ? conditions[0] 
      : and(...conditions);
    
    return await db.select().from(tasks).where(whereClause);
  }

  static async createTask(userId: string, taskData: Omit<Task, 'id' | 'userId'>) {
    const { title, description, category } = taskData;
    
    const newTask = await db.insert(tasks).values({
      userId,
      title,
      description,
      category,
    }).returning();
    
    return newTask[0];
  }

  static async updateTask(userId: string, taskId: number, taskData: Partial<Task>) {
    const { title, description, category, completed } = taskData;
    
    const updatedTask = await db.update(tasks)
      .set({
        title,
        description,
        category,
        completed,
        updatedAt: new Date(),
      })
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
      .returning();
    
    return updatedTask.length > 0 ? updatedTask[0] : null;
  }

  static async deleteTask(userId: string, taskId: number) {
    const deletedTask = await db.delete(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
      .returning();
    
    return deletedTask.length > 0;
  }

  static async getTaskStats(userId: string): Promise<TaskStats> {
    const allTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));
    const completedTasks = allTasks.filter(task => task.completed);
    
    return {
      totalTasks: allTasks.length,
      completedTasks: completedTasks.length,
      pendingTasks: allTasks.length - completedTasks.length,
      completionRate: allTasks.length > 0 ? (completedTasks.length / allTasks.length) * 100 : 0,
    };
  }
}