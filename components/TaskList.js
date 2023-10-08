import React from 'react';

function TaskList({ tasks, onDelete, onEdit, onComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <span>{task.text}</span>
          <button onClick={() => onDelete(task._id)}>Delete</button>
          <button onClick={() => onEdit(task._id, task.text)}>Edit</button>
          <button onClick={() => onComplete(task._id)}>Complete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
