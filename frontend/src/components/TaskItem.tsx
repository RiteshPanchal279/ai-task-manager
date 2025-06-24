import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Edit, Trash2 } from 'lucide-react';
import { Task } from '../../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggleComplete(task)}
      >
        {task.completed ? (
          <CheckCircle className="h-4 w-4 text-green-600" />
        ) : (
          <Circle className="h-4 w-4" />
        )}
      </Button>
      
      <div className="flex-1">
        <div className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
          {task.title}
        </div>
        {task.description && (
          <div className="text-sm text-muted-foreground">{task.description}</div>
        )}
        {task.category && (
          <Badge variant="secondary" className="mt-1 text-xs">
            {task.category}
          </Badge>
        )}
      </div>
      
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}