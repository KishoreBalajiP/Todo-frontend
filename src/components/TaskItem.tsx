import { Trash2, Edit2, RotateCcw } from 'lucide-react';

interface TaskItemProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  recurring?: string;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRepeat?: (id: string) => void;
}

const TaskItem = ({
  id,
  title,
  description,
  completed,
  dueDate,
  recurring,
  onToggle,
  onEdit,
  onDelete,
  onRepeat,
}: TaskItemProps) => {

  const isOverdue =
    dueDate && !completed && new Date(dueDate).getTime() < new Date().getTime();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 mb-3 transition-all hover:shadow-md 
      ${completed ? 'opacity-60' : ''}
      ${isOverdue ? 'border border-red-400' : ''}`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => onToggle(id, e.target.checked)}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer mt-1"
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold ${
              completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {title}
          </h3>

          {description && (
            <p className={`text-sm mt-1 ${completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">

            {dueDate && (
              <span
                className={`text-xs px-2 py-1 rounded
                ${isOverdue
                  ? 'bg-red-100 text-red-700 font-semibold'
                  : 'bg-blue-100 text-blue-700'}`}
              >
                {isOverdue ? 'Overdue • ' : ''}
                {formatDate(dueDate)}
              </span>
            )}

            {recurring && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                {recurring}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {recurring && onRepeat && (
            <button
              onClick={() => onRepeat(id)}
              className="p-2 hover:bg-green-100 rounded-lg text-green-600"
            >
              <RotateCcw size={18} />
            </button>
          )}

          <button
            onClick={() => onEdit(id)}
            className="p-2 hover:bg-blue-100 rounded-lg text-blue-600"
          >
            <Edit2 size={18} />
          </button>

          <button
            onClick={() => onDelete(id)}
            className="p-2 hover:bg-red-100 rounded-lg text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;