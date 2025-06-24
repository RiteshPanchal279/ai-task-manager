'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TaskFormData {
  title: string;
  description: string;
  category: string;
}

interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [task, setTask] = useState<TaskFormData>({
    title: '',
    description: '',
    category: ''
  });

  const handleSubmit = () => {
    if (!task.title.trim()) return;
    
    onSubmit(task);
    setTask({ title: '', description: '', category: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Task title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <Textarea
          placeholder="Description (optional)"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <Input
          placeholder="Category (optional)"
          value={task.category}
          onChange={(e) => setTask({ ...task, category: e.target.value })}
        />
        <Button onClick={handleSubmit} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </CardContent>
    </Card>
  );
}