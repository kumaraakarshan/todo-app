// components/Task.js
import { useState } from 'react';

const Task = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed);

  const toggleCompletion = async () => {
    // Send a PATCH request to update the task's completion status
    try {
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        setCompleted(!completed);
      } else {
        console.error('Failed to toggle completion status');
      }
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const deleteTask = async () => {
    // Send a DELETE request to remove the task
    try {
      const response = await fetch(`/api/tasks/${task._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle deletion on the UI as needed
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={completed}
        onChange={toggleCompletion}
      />
      <span>{task.text}</span>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};

export default Task;
