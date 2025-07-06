const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Task {
  id: number;
  task: string;
}

export const fetchMessage = async (): Promise<string> => {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch message');
  }
  return (await response.json()).message;
};

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (task: string): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task }),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
}; 