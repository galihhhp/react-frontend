import { useState } from "react";
import "./App.css";
import { useTaskManager } from "./hooks/useTaskManager";

function App() {
  const {
    message,
    tasks,
    newTask,
    setNewTask,
    error,
    handleCreateTask,
    getTasks,
  } = useTaskManager();
  const [tasksVisible, setTasksVisible] = useState(false);

  const handleShowTasks = () => {
    getTasks();
    setTasksVisible(true);
  };

  return (
    <>
      <h1>Task Manager</h1>
      <p>{error || message}</p>

      <div className="card">
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            aria-label="New task input"
          />
          <button type="submit">Add Task</button>
        </form>
      </div>

      {!tasksVisible ? (
        <button onClick={handleShowTasks}>Show Tasks</button>
      ) : (
        <>
          <h2>Tasks</h2>
          <ul>
            {tasks.length > 0 ? (
              tasks.map((task) => <li key={task.id}>{task.task}</li>)
            ) : (
              <li>No tasks yet.</li>
            )}
          </ul>
        </>
      )}
    </>
  );
}

export default App;
