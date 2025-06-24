 export interface Task {
  id: number;
  user_id:string
  title: string;
  description?: string;
  category?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Stats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
}

export type FilterType = 'all' | 'completed' | 'pending';