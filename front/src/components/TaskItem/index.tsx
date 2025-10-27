
type TaskItemProps = {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({
  id,
  title,
  description,
  isCompleted,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <div className="tasks-item-container">
      <strong className="tasks-item-container__title-text">{title}</strong> —{" "}
      <span className="tasks-item-container__desc">
        {description || "Sin descripción"}
      </span>{" "}
      {isCompleted ? "✅" : "🕓"}{" "}
      <div className="tasks-item-container__buttons">
        <button onClick={() => onEdit(id)}>✏️</button>
        <button onClick={() => onDelete(id)}>❌</button>
      </div>
    </div>
  );
}
