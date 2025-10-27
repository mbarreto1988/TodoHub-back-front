/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { tasksApi } from "../../api/tasks.api";
import { useAuthStore } from "../../stores/auth.store";

type TaskEditFormProps = {
  taskId: number;
  initialTitle: string;
  initialDesc?: string;
  initialCompleted: boolean;
  onCancel: () => void;
  onSave: (updatedTask: any) => void;
};

export default function TaskEditForm({
  taskId,
  initialTitle,
  initialDesc = "",
  initialCompleted,
  onCancel,
  onSave
}: TaskEditFormProps) {
  const token = useAuthStore((s) => s.accessToken);
  const [title, setTitle] = useState(initialTitle);
  const [desc, setDesc] = useState(initialDesc);
  const [completed, setCompleted] = useState(initialCompleted);

  const handleSave = async () => {
    if (!token) return;
    const updated = await tasksApi.update(token, taskId, {
      title,
      description: desc,
      isCompleted: completed
    });
    onSave(updated.data);
  };

  return (
    <div className="tasks-edit-container">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Descripción"
      />
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />{" "}
        Terminado
      </label>
      <div className="tasks-edit-container__edit-buttons">
        <button onClick={handleSave}>💾 Guardar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
