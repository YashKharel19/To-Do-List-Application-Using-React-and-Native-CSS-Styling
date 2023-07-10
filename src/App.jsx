import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.log('Error:', error)
      return [];
    }
  }
  useEffect(() => {
    fetchData()
      .then((data) => setTasks(data));
  }, []);


  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
      };
      setTasks([newTaskObject, ...tasks,]);
      setNewTask('');
    }
  };
  const handleRemoveTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>
      <table>
        <thead>
          <tr>
            <th>Status</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className={task.completed ? 'completed' : 'pending'}
            >
              <td>{task.completed ? '\u2713' : '\u2212'}</td>
              <td>{task.title}</td>
              <td>
                {task.completed ? (
                  <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
                ) : (
                  <button onClick={() => handleRemoveTask(task.id)} className="remove-button">Remove</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App
