import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BiTrash, BiPlus, BiImageAdd } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [taskToRemove, setTaskToRemove] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [taskImages, setTaskImages] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [taskDeadline, setTaskDeadline] = useState('');
  const [availableTags] = useState([
    '🛒 Spesa',
    '💼 Lavoro',
    '📺 Serie TV',
    '🎬 Film',
    '🎮 Giochi',
    '📦 Altro',
  ]);
  const tagColors = {
      '🛒 Spesa': '#FF5733',      
      '💼 Lavoro': '#3498DB',     
      '📺 Serie TV': '#2ECC71',   
      '🎬 Film': '#967ADC',       
      '🎮 Giochi': '#F1C40F',    
      '📦 Altro': '#FF6B81',
    };

  
  const titleStyle = {
    color: '#5a9282',
    fontFamily: 'Acme, sans-serif',
  };


  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const parsedDeadline = taskDeadline ? parseCustomDate(taskDeadline) : null;
      const taskWithTimestamp = {
        text: newTask,
        timestamp: getFormattedTimestamp(),
        completed: false,
        image: taskImages[tasks.length] || '',
        deadline: parsedDeadline,
        tags: [...selectedTags],
      };

      setTasks([...tasks, taskWithTimestamp]);
      setNewTask('');
      setTaskImages({ ...taskImages, [tasks.length]: null });
      localStorage.setItem('tasks', JSON.stringify([...tasks, taskWithTimestamp]));
      setValidationError(null);
    } else {
      setValidationError('Il campo non può essere vuoto.');
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const TagSelector = ({ tags, selectedTags, onSelectTag }) => {
    return (
      <div className="d-flex align-items-center">
        <br />
        <div>
          <label>Seleziona le tags:</label>
          {tags.map((tag) => (
            <button
              key={tag}
              style={{ backgroundColor: tagColors[tag] || 'black' }}
              className={`btn ${selectedTags.includes(tag) ? 'btn-success' : 'btn-light'}`}
              onClick={() => onSelectTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <br></br>
      </div>
    );
  };
  


  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const confirmRemove = (index) => {
    setTaskToRemove(index);
    setShowModal(true);
  };

  const handleRemove = () => {
    if (taskToRemove !== null) {
      const updatedTasks = tasks.filter((_, index) => index !== taskToRemove);
      setTasks(updatedTasks);
      setTaskImages((prevImages) => {
        const { [taskToRemove]: removedImage, ...restImages } = prevImages;
        return restImages;
      });
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    setShowModal(false);
    setShowConfirmationModal(true);
  };

  const handleRemoveAll = () => {
    setTasks([]);
    setTaskImages({});
    localStorage.removeItem('tasks');
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
    setTaskToRemove(null);
  };

  const editTask = (index) => {
    setEditingTask(index);
    setNewTask(tasks[index].text);
    setTaskDeadline(tasks[index].deadline || '');
    setSelectedTags([...tasks[index].tags]);
  };


  const saveEditedTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editingTask] = {
        ...updatedTasks[editingTask],
        text: newTask,
        deadline: taskDeadline,
        tags: [...selectedTags],
      };
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setEditingTask(null);
      setNewTask('');
      setTaskDeadline('');
      setSelectedTags([]);
    }
  };

  const getFormattedTimestamp = () => {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return now.toLocaleDateString('it-IT', options);
  };

  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedDate = new Date(dateString).toLocaleDateString('it-IT', options);
    return formattedDate;
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageSrc = event.target.result;
        setTaskImages({ ...taskImages, [index]: imageSrc });
        localStorage.setItem('taskImages', JSON.stringify({ ...taskImages, [index]: imageSrc }));
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
      const savedImages = JSON.parse(localStorage.getItem('taskImages'));
      setTaskImages(savedImages || {});
    }
  }, []);

  const parseCustomDate = (dateString) => {
    if (dateString) {
      const parts = dateString.split('T');
      const datePart = parts[0];
      const timePart = parts[1];
      const [year, month, day] = datePart.split('-');
      const [hour, minute] = timePart.split(':');
      return new Date(year, month - 1, day, hour, minute);
    }
    return null;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center" style={titleStyle}>
        MG TO DO LIST
      </h1>
      <div className="input-group mb-3">
        <input
          className="custom-input"
          placeholder="Aggiungi un nuovo compito (max 100 caratteri)"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value.substring(0, 100))}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTask();
            }
          }}
        />
        <input
          type="datetime-local"
          className="form-control"
          value={taskDeadline}
          onChange={(e) => setTaskDeadline(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={addTask}>
            <BiPlus />
          </button>
          <button className="btn btn-danger ml-1" onClick={handleRemoveAll}>
            <MdDelete />
          </button>
        </div>
      </div>
      {validationError && <div className="text-danger">{validationError}</div>}
      <TagSelector tags={availableTags} selectedTags={selectedTags} onSelectTag={toggleTag} />
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''
              }`}
          >
            {editingTask === index ? (
              <div>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <input
                  type="datetime-local"
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                />
                <TagSelector tags={availableTags} selectedTags={selectedTags} onSelectTag={toggleTag} />
                <button className="btn btn-success" onClick={saveEditedTask}>
                  Salva
                </button>
              </div>
            ) : (
              <span
                onClick={() => toggleCompleted(index)}
                style={{
                  cursor: 'pointer',
                  textDecoration: task.completed ? 'line-through' : 'none',
                }}
              >
                {task.text}
              </span>
            )}
            <span className="text-muted">{task.timestamp}</span>
            <span className="text-primary">
              {task.deadline ? formatDate(task.deadline) : 'Nessuna scadenza'}
            </span>
            <div className="tags">
              {task.tags && task.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="tag"
                  style={{ backgroundColor: tagColors[tag] || 'lightgray' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <label htmlFor={`file-input-${index}`} style={{marginTop:"10px"}}>
              <BiImageAdd size={28} color="#5a9282" />
            </label>
            <input
              type="file"
              id={`file-input-${index}`}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageChange(e, index)}
            />
            <img
              src={taskImages[index] || ''}
              alt=""
              className={`task-image ${!taskImages[index] ? 'task-image-opacity' : ''}`}
            />
            <div className="d-flex">
              {editingTask === index ? (
                <button className="btn btn-success" onClick={saveEditedTask}>
                  Salva
                </button>
              ) : (
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(index)}
                    style={{ marginRight: "20px" }}
                  />
                  <button className="btn btn-warning" onClick={() => editTask(index)}>
                    Modifica
                  </button>
                </div>
              )}
              <button className="btn btn-danger ml-2" onClick={() => confirmRemove(index)}>
                <BiTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Rimozione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler rimuovere questa task?</Modal.Body>
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
        <Modal.Body>La task è stata rimossa con successo.</Modal.Body>
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
