"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { AuthGuard } from "./AuthGuard";
import { StatsCards } from "./StatsCards";
import { AITaskGenerator } from "./AITaskGenerator";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { TaskEditDialog } from "./TaskEditDialog";
import { useTasks } from "@/hooks/useTasks";
import { Task, FilterType } from "../../types/task";
import { UserButton } from "@clerk/nextjs";

export default function TaskDashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const {
    tasks,
    stats,
    loading,
    createTask,
    updateTask,
    deleteTask,
    saveGeneratedTask,
  } = useTasks(filter);

  const handleToggleComplete = async (task: Task) => {
    await updateTask({ ...task, completed: !task.completed });
  };

  const handleUpdateTask = async (task: Task) => {
    await updateTask(task);
    setEditingTask(null);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <AuthGuard>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
          {/* Header */}
          <div className="flex sm:flex-row justify-between items-start sm:items-center gap-4 mx-5">
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  AI Task Manager
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Welcome back,{" "}
                  <span className="font-medium text-primary">
                    {user?.firstName}
                  </span>
                  !
                </p>
              </div>
              <div>
                <UserButton />
              </div>
          </div>

          {/* Stats */}
          {stats && (
            <div className="bg-white shadow rounded-xl p-4">
              <StatsCards stats={stats} />
            </div>
          )}

          {/* AI Task Generation */}
          <div className="bg-white shadow rounded-xl p-4">
            <AITaskGenerator
              onTaskGenerated={() => {}}
              onSaveTask={saveGeneratedTask}
            />
          </div>

          {/* Task Management */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add New Task */}
            <div className="bg-white shadow rounded-xl p-4">
              <TaskForm onSubmit={createTask} />
            </div>

            {/* Task List */}
            <div className="lg:col-span-2 bg-white shadow rounded-xl p-4">
              <TaskList
                tasks={tasks}
                filter={filter}
                onFilterChange={setFilter}
                onToggleComplete={handleToggleComplete}
                onEdit={setEditingTask}
                onDelete={deleteTask}
              />
            </div>
          </div>

          {/* Edit Task Dialog */}
          <TaskEditDialog
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onSave={handleUpdateTask}
            onChange={setEditingTask}
          />
        </div>
      )}
    </AuthGuard>
  );
}
