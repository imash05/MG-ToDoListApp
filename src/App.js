import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BiTrash } from "react-icons/bi";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [taskToRemove, setTaskToRemove] = useState(null);
  const titleStyle = {
    color: "#5a9282",
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const taskWithTimestamp = `${newTask} - ${getFormattedTimestamp()}`;
      setTasks([...tasks, taskWithTimestamp]);
      setNewTask('');
      localStorage.setItem('tasks', JSON.stringify([...tasks, taskWithTimestamp]));
    }
  };

  const confirmRemove = (index) => {
    setTaskToRemove(index);
    setShowModal(true);
  };

  const handleRemove = () => {
    if (taskToRemove !== null) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(taskToRemove, 1);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    setShowModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
    setTaskToRemove(null);
  };

  const getFormattedTimestamp = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return now.toLocaleDateString('it-IT', options);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center"style={titleStyle}>
        <img src="./MGLogo.png" alt="Logo" className="w-20 h-20 mr-2" />
        MG TODO LIST
      </h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Aggiungi un nuovo compito"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={addTask}>
            Aggiungi
          </button>
        </div>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{task.split(' - ')[0]}</span>
            <span className="text-muted">{task.split(' - ')[1]}</span>
            <button className="btn btn-danger" onClick={() => confirmRemove(index)}>
              <BiTrash />
            </button>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Rimozione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler rimuovere questa task?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Rimuovi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmationModal} onHide={handleConfirmationModalClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Rimozione Completata</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          La task è stata rimossa con successo.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirmationModalClose}>
            Torna all'inizio
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
