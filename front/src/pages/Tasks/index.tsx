import { useState, type ComponentType } from "react";
import { useTasksHandler, type Task } from "../../hooks/tasks/useTasksHandler";
import TaskItem from "../../components/TaskItem";
import TaskForm from "../../components/TaskForm";

type TaskEditProps = {
  taskId: number;
  initialTitle: string;
  initialDesc?: string;
  initialCompleted: boolean;
  onCancel: () => void;
  onSave: (updatedTask: Task) => void;
};

type TasksProps = {
  EditComponent: ComponentType<TaskEditProps>;
};

export default function Tasks({ EditComponent }: TasksProps) {
  const { tasks, loading, editingId, setEditingId, addTask, deleteTask, saveTask } = useTasksHandler();
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    await addTask(newTask, description);
    setNewTask("");
    setDescription("");
  };

  return (
    <section className="tasks-container">
      <h1 className="tasks-container__title">Mis tareas</h1>

      <TaskForm onAdd={handleAdd} />

      {loading ? (
        <p className="tasks-container__loading">Cargando...</p>
      ) : (
        <ul className="tasks-container__list">
          {tasks.map((t) => (
            <li key={t.id}>
              {editingId === t.id ? (
                <EditComponent
                  taskId={t.id}
                  initialTitle={t.title}
                  initialDesc={t.description}
                  initialCompleted={t.isCompleted}
                  onCancel={() => setEditingId(null)}
                  onSave={saveTask}
                />
              ) : (
                <TaskItem
                  id={t.id}
                  title={t.title}
                  description={t.description}
                  isCompleted={t.isCompleted}
                  onEdit={() => setEditingId(t.id)}
                  onDelete={deleteTask}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
