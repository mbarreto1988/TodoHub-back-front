import { useEffect, useState } from "react";
import { tasksApi } from "../../../api/tasks.api";
import { useAuthStore } from "../../../stores/auth.store";

export type Task = {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
};

export function useTasksHandler() {
  const token = useAuthStore((s) => s.accessToken);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    tasksApi
      .getAll(token)
      .then((data) => setTasks(data))
      .finally(() => setLoading(false));
  }, [token]);

  const addTask = async (title: string, description: string) => {
    if (!title.trim()) return;
    const created = await tasksApi.create(token!, { title, description });
    setTasks((prev) => [...prev, created.data]);
  };

  const deleteTask = async (id: number) => {
    await tasksApi.delete(token!, id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const saveTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setEditingId(null);
  };

  return {
    tasks,
    loading,
    editingId,
    setEditingId,
    addTask,
    deleteTask,
    saveTask,
  };
}
