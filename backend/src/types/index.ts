export interface User {
  id?: number;
  clerkId: string;
  email: string;
  name: string;
  createdAt?: Date;
}

export interface Task {
  id?: number;
  userId: string;
  title: string;
  description?: string;
  category?: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
}

export interface GenerateTasksRequest {
  topic: string;
}
