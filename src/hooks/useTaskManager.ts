import { useState, useEffect, useCallback } from "react";
import type { Task } from "../services/api";
import {
  fetchMessage,
  fetchTasks,
  createTask as apiCreateTask,
} from "../services/api";

export const useTaskManager = () => {
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState<string | null>(null);

  const getTasks = useCallback(async () => {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (err) {
      setError("Could not fetch tasks.");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const messageData = await fetchMessage();
        setMessage(messageData);
      } catch (err) {
        setError("Could not connect to the server.");
        console.error(err);
      }
    };

    getMessage();
  }, []);

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await apiCreateTask(newTask);
      setNewTask("");
      await getTasks();
    } catch (err) {
      setError("Could not create task.");
      console.error(err);
    }
  };

  return {
    message,
    tasks,
    newTask,
    setNewTask,
    error,
    handleCreateTask,
    getTasks,
  };
};
