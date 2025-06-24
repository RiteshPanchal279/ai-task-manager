import { db } from '../config/database';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { User } from '../types';

export class UserService {
  static async createOrGetUser(userData: User) {
    const { clerkId, email, name } = userData;
    
    const existingUser = await db.select().from(users).where(eq(users.clerkId, clerkId));
    
    if (existingUser.length > 0) {
      return existingUser[0];
    }
    
    const newUser = await db.insert(users).values({
      clerkId,
      email,
      name,
    }).returning();
    
    return newUser[0];
  }
}