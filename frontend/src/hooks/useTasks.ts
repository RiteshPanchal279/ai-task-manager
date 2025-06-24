'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { Task, Stats, FilterType } from '../../types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function useTasks(filter: FilterType) {
  const { user, isLoaded } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }
    return {
      'x-clerk-user-id': user.id,
      'Content-Type': 'application/json',
    };
  };

  const fetchTasks = async () => {
    if (!user) return;
    
    try {
      const params = filter !== 'all' ? { completed: filter === 'completed' } : {};
      const response = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: getAuthHeaders(),
        params,
        
      });
      setTasks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]); 
    }
  };

  const fetchStats = async () => {
    if (!user) return;
    
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`, {
        headers: getAuthHeaders(),
      });
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const createTask = async (taskData: { title: string; description: string; category: string }) => {
    if (!user) return;
    
    try {
      await axios.post(`${API_BASE_URL}/tasks`, taskData, {
        headers: getAuthHeaders(),
      });
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (task: Task) => {
    if (!user) return;
    
    try {
      await axios.put(`${API_BASE_URL}/tasks/${task.id}`, task, {
        headers: getAuthHeaders(),
      });
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: number) => {
    if (!user) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
        headers: getAuthHeaders(),
      });
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const saveGeneratedTask = async (taskTitle: string, category: string) => {
    if (!user) return;
    
    try {
      await axios.post(
        `${API_BASE_URL}/tasks`,
        { title: taskTitle, category },
        { headers: getAuthHeaders() }
      );
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  

  useEffect(() => {
    if (isLoaded && user) {
      fetchTasks();
      fetchStats();
      setLoading(false);
    } else if (isLoaded && !user) {
      setLoading(false);
    }
  }, [isLoaded, user, filter]);

  return {
    tasks,
    stats,
    loading,
    createTask,
    updateTask,
    deleteTask,
    saveGeneratedTask,
    refreshTasks: fetchTasks
  };
}