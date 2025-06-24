"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface AITaskGeneratorProps {
  onTaskGenerated: (tasks: string[]) => void;
  onSaveTask: (taskTitle: string, category: string) => void;
}

export function AITaskGenerator({
  onTaskGenerated,
  onSaveTask,
}: AITaskGeneratorProps) {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const { user } = useUser();

  const generateTasks = async () => {
    if (!topic.trim()) return;

    setGenerating(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-clerk-user-id": user?.id || "",
          },
          body: JSON.stringify({ topic }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate tasks");
      }

      const data = await response.json();
      const tasks = data?.data?.tasks || [];

      setGeneratedTasks(tasks);
      onTaskGenerated(tasks);
    } catch (error) {
      console.error("Error generating tasks:", error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveTask = (taskTitle: string) => {
    onSaveTask(taskTitle, topic);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Generate Tasks with AI
        </CardTitle>
        <CardDescription>
          Enter a topic and get 5 AI-generated tasks to help you learn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="e.g., Learn Python, Master React, Study Machine Learning"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && generateTasks()}
          />
          <Button
            onClick={generateTasks}
            disabled={generating || !topic.trim()}
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Generate"
            )}
          </Button>
        </div>

        {generatedTasks.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Generated Tasks for "{topic}":</h4>
            {generatedTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded"
              >
                <span className="flex-1">{task}</span>
                <Button size="sm" onClick={() => handleSaveTask(task)}>
                  Save Task
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
