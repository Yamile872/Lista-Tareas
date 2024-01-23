import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask }) {
  const [editedTaskText, setEditedTaskText] = useState('');
  const editTaskModalRef = useRef(null);

  const handleEditInputChange = (event) => {
    setEditedTaskText(event.target.value);
  };

  const handleEditTask = (index) => {
    onEditTask(index, editedTaskText);
    setEditedTaskText('');

    if (editTaskModalRef.current) {
        const modal = new window.bootstrap.Modal(editTaskModalRef.current);
        modal.hide();
      }
  };

  return (
    <ul className='list-group'>
      {tasks.map((task, index) => (
        <li
          key={index}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            task.completed ? 'bg-light text-muted' : ''
          }`}
        >
          <div>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => onToggleTask(index)}
              className='me-2'
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
          </div>
          <div className='btn-group' role='group'>
            <button
              type='button'
              className='btn btn-warning btn-sm me-2'
              data-bs-toggle='modal'
              data-bs-target={`#editTaskModal${index}`}
            >
              Editar
            </button>
            <button
              className='btn btn-danger btn-sm'
              onClick={() => onDeleteTask(index)}
            >
              Eliminar
            </button>
          </div>

          <div
            className='modal fade'
            id={`editTaskModal${index}`}
            tabIndex='-1'
            aria-labelledby={`editTaskModalLabel${index}`}
            aria-hidden='true'
            ref={editTaskModalRef}
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id={`editTaskModalLabel${index}`}>
                    Editar Tarea
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <input
                    type='text'
                    className='form-control'
                    value={editedTaskText}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Cerrar
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => handleEditTask(index)}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
