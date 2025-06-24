import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TaskItem } from './TaskItem';
import { Task, FilterType } from '../../types/task';

interface TaskListProps {
  tasks: Task[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onToggleComplete: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

export function TaskList({ 
  tasks, 
  filter, 
  onFilterChange, 
  onToggleComplete, 
  onEdit, 
  onDelete 
}: TaskListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Your Tasks</CardTitle>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('pending')}
            >
              Pending
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('completed')}
            >
              Completed
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No tasks found. Create your first task or generate some with AI!
          </div>
        ) : (
          <div className="space-y-2">
            {[...tasks].reverse().map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}