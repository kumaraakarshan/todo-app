// components/TaskManager.js
import React from 'react';

function TaskManager({ tasks }) {
  const onDelete = (taskId) => {
    // Delete the task on the server
    fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })
      .then(() => {
        // Update the tasks state to remove the deleted task
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  const onEdit = (taskId, newText) => {
    // Implement the edit functionality here
    // You can open a modal or update the task's text on the server
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span>{task.text}</span>
            <button onClick={() => onDelete(task._id)}>Delete</button>
            <button onClick={() => onEdit(task._id, task.text)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
