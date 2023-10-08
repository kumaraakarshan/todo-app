// pages/index.js
import { useState, useEffect } from 'react';
import Task from '../components/Task';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!newTaskText) {
      return;
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTaskText }),
      });

      if (response.ok) {
        setNewTaskText('');
        fetchTasks(); // Refresh task list
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
    </div>
  );
};

export default Home;
