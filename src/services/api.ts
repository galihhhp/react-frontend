import { loadConfig } from '../config';

export interface Task {
  id: number;
  task: string;
}

export const fetchMessage = async (): Promise<string> => {
  const config = await loadConfig();
  const response = await fetch(`${config.apiUrl}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch message');
  }
  return response.text();
};

export const fetchTasks = async (): Promise<Task[]> => {
  const config = await loadConfig();
  const response = await fetch(`${config.apiUrl}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (task: string): Promise<void> => {
  const config = await loadConfig();
  const response = await fetch(`${config.apiUrl}/tasks`, {
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