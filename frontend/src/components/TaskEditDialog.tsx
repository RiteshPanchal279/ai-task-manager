import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Task } from '../../types/task';

interface TaskEditDialogProps {
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
  onChange: (task: Task) => void;
}

export function TaskEditDialog({ task, onClose, onSave, onChange }: TaskEditDialogProps) {
  if (!task) return null;

  return (
    <Dialog open={!!task} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            value={task.title}
            onChange={(e) => onChange({ ...task, title: e.target.value })}
          />
          <Textarea
            value={task.description || ''}
            onChange={(e) => onChange({ ...task, description: e.target.value })}
          />
          <Input
            value={task.category || ''}
            onChange={(e) => onChange({ ...task, category: e.target.value })}
          />
          <Button onClick={() => onSave(task)} className="w-full">
            Update Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}