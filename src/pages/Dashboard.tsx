import { useState, useEffect } from "react";
import { LogOut, Plus } from "lucide-react";
import TaskItem from "../components/TaskItem";
import TaskModal from "../components/TaskModal";

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  recurring?: string;
}

interface DashboardProps {
  onNavigate: (page: "login" | "signup" | "dashboard") => void;
  onToast: (message: string, type: "success" | "error") => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = ({ onNavigate, onToast }: DashboardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recurringFilter, setRecurringFilter] = useState("all");

  // 🔥 ADDED FOR EDIT FEATURE
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      let url = `${API_URL}/api/tasks`;

      if (recurringFilter !== "all") {
        url += `?recurring=${recurringFilter}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: token || "",
        },
      });

      if (!res.ok) {
        onToast("Failed to load tasks", "error");
        return;
      }

      const data = await res.json();

      const sorted = data.sort((a: Task, b: Task) => {
        const aOverdue = a.dueDate && !a.completed && new Date(a.dueDate) < new Date();
        const bOverdue = b.dueDate && !b.completed && new Date(b.dueDate) < new Date();
        return Number(bOverdue) - Number(aOverdue);
      });

      setTasks(sorted);
    } catch {
      onToast("Server error while loading tasks", "error");
    }
  };

  useEffect(() => {
    loadTasks();
  }, [recurringFilter]);

  useEffect(() => {
    if (!("Notification" in window)) return;

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        tasks.forEach((task) => {
          if (
            task.dueDate &&
            !task.completed &&
            new Date(task.dueDate) < new Date()
          ) {
            new Notification("Missed Task ⚠️", {
              body: task.title,
            });
          }
        });
      }
    });
  }, [tasks]);

  // 🔥 UPDATED: CREATE + EDIT BOTH
  const handleSaveTask = async (data: any) => {
    try {
      const token = localStorage.getItem("token");

      // EDIT MODE
      if (editingTask) {
        const res = await fetch(`${API_URL}/api/tasks/${editingTask._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token || "",
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          onToast("Failed to update task", "error");
          return;
        }

        const updated = await res.json();

        setTasks((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );

        onToast("Task updated!", "success");
        setEditingTask(null);
        setIsModalOpen(false);
        return;
      }

      // CREATE MODE (existing)
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        onToast("Error creating task", "error");
        return;
      }

      const newTask = await res.json();

      setTasks((prev) => [...prev, newTask]);
      onToast("Task created!", "success");
      setIsModalOpen(false);
    } catch {
      onToast("Server error while saving task", "error");
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({ completed }),
      });

      if (!res.ok) {
        onToast("Failed to update task", "error");
        return;
      }

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed } : task
        )
      );
    } catch {
      onToast("Server error while updating task", "error");
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token || "",
        },
      });

      if (!res.ok) {
        onToast("Failed to delete task", "error");
        return;
      }

      setTasks((prev) => prev.filter((task) => task._id !== id));
      onToast("Task deleted", "success");
    } catch {
      onToast("Server error while deleting task", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onNavigate("login");
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.filter((t) => !t.completed).length;

  const isOverdue = (dueDate?: string, completed?: boolean) => {
    if (!dueDate || completed) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">TaskFlow</h1>
            <p className="text-gray-600 mt-1">Your Tasks</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6">
          {["all", "daily", "weekly", "monthly"].map((type) => (
            <button
              key={type}
              onClick={() => setRecurringFilter(type)}
              className={`px-4 py-1 rounded-lg capitalize ${
                recurringFilter === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-1">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900">{tasks.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-1">Active</p>
            <p className="text-3xl font-bold text-blue-600">{activeCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          </div>
        </div>

        {/* Task Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>

            <button
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <Plus size={18} />
              New Task
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No tasks yet. Create one to get started.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className={
                  isOverdue(task.dueDate, task.completed)
                    ? "border-l-4 border-red-500"
                    : ""
                }
              >
                <TaskItem
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  completed={task.completed}
                  dueDate={task.dueDate}
                  recurring={task.recurring}
                  onToggle={handleToggleTask}
                  onEdit={(id) => {
                    const found = tasks.find((t) => t._id === id);
                    if (found) {
                      setEditingTask(found);
                      setIsModalOpen(true);
                    }
                  }}
                  onDelete={handleDeleteTask}
                />
              </div>
            ))
          )}
        </div>
      </div>

<TaskModal
  isOpen={isModalOpen}
  task={
    editingTask
      ? {
          id: editingTask._id,
          title: editingTask.title,
          description: editingTask.description,
          dueDate: editingTask.dueDate,
          recurring: editingTask.recurring,
        }
      : undefined
  }
  onClose={() => {
    setIsModalOpen(false);
    setEditingTask(null);
  }}
  onSave={handleSaveTask}
/>
    </div>
  );
};

export default Dashboard;