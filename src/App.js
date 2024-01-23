import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import 'bootstrap/dist/css/bootstrap.min.css'

function TodoApp() {
  const storedTasks = JSON.parse(localStorage.getItem('task')) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, {text: newTask, completed: false}]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleToggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleEditTask = (index, editedText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedText;
    setTasks(updatedTasks);
  };

  return (
    
    <div className='container mt-4'>
      <h1 className='display-4'>Lista de Tareas</h1>
      <div className='input-group mb-3'>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          className='form-control'
          placeholder="Nueva tarea"
        />
        <div className='input-group-append'>
          <button onClick={handleAddTask} className='btn btn-primary'>
            Agregar
          </button>
        </div>
      </div>
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} onEditTask={handleEditTask}/>
    </div>
  );
}

export default TodoApp;
