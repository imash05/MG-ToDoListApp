import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/minty/bootstrap.min.css";
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
  const [taskDeadline, setTaskDeadline] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editSelectedCategory, setEditSelectedCategory] = useState('');
  const [editingTags, setEditingTags] = useState([]);
  const [selectedBorderColor, setSelectedBorderColor] = useState('lightgray');


  const customBorderColors = [
    { name: 'Blu Pastello', color: '#AED6F1', emoji: '🌊' },
    { name: 'Verde Acqua', color: '#A3E4D7', emoji: '🌿' },
    { name: 'Rosa Pallido', color: '#F7CAC9', emoji: '🌸' },
    { name: 'Marrone Sabbia', color: '#D2B48C', emoji: '🏖️' },
    { name: 'Lilla Chiaro', color: '#D9A0D9', emoji: '🌼' },
    { name: 'Giallo Chiaro', color: '#FFFF99', emoji: '☀️' },
    { name: 'Verde Smeraldo', color: '#50C878', emoji: '🍀' },
    { name: 'Arancione', color: '#FFA500', emoji: '🍊' },
    { name: 'Viola Profondo', color: '#8A2BE2', emoji: '💜' },
    { name: 'Rosso Chiaro', color: '#FF6347', emoji: '❤️' },
    { name: 'Blu Scuro', color: '#00008B', emoji: '🌌' },
    { name: 'Verde Menta', color: '#98FB98', emoji: '🌱' },
    { name: 'Rosa Caldo', color: '#FF69B4', emoji: '💖' },
    { name: 'Grigio Argento', color: '#C0C0C0', emoji: '⚙️' },
    { name: 'Turchese', color: '#40E0D0', emoji: '🏝️' },
  ];
  


  const handleBorderColorChange = (color) => {
    if (color === "") {
      setSelectedBorderColor('#efefef'); // Imposta il colore predefinito
    } else {
      setSelectedBorderColor(color);
    }
    localStorage.setItem('selectedBorderColor', color);
  };

  useEffect(() => {
    const savedBorderColor = localStorage.getItem('selectedBorderColor');
    if (savedBorderColor) {
      setSelectedBorderColor(savedBorderColor);
    }
  }, []);

  const tagColors = {
    '🛒 Ingredienti': '#AED6F1',
    '🍞 Pane': '#AED6F1',
    '🍎 Frutta': '#AED6F1',
    '🥦 Verdure': '#AED6F1',
    '🧀 Latticini': '#AED6F1',
    '🥖 Panetteria': '#AED6F1',
    '🥩 Carne': '#AED6F1',
    '🍷 Bevande': '#AED6F1',
    '🥕 Prodotti per la pulizia': '#AED6F1',
    '💼 Lavoro': '#B0E57C',
    '📅 Scadenza': '#B0E57C',
    '💻 Progetto': '#B0E57C',
    '📈 Rapporto': '#B0E57C',
    '✉️ Email': '#B0E57C',
    '📑 Documenti': '#B0E57C',
    '📊 Riunioni': '#B0E57C',
    '📔 Note': '#B0E57C',
    '💡 Idee': '#B0E57C',
    '📝 Compiti': '#B0E57C',
    '📺 Serie TV': '#F7CAC9',
    '🎬 Film': '#F7CAC9',
    '🎮 Giochi': '#F7CAC9',
    '🎵 Musica': '#F7CAC9',
    '🏞️ Attività fuori': '#F7CAC9',
    '📚 Lettura': '#F7CAC9',
    '🚴 Sport': '#F7CAC9',
    '🏊 Piscina': '#F7CAC9',
    '🍔 Ristorante': '#F7CAC9',
    '🚗 Trasporti': '#F7CAC9',
    '🌍 Viaggi': '#F7CAC9',
    '📅 Appuntamenti': '#F7CAC9',
    '📷 Fotografia': '#F7CAC9',
    '🛋️ Shopping': '#F7CAC9',
    '📦 Altro': '#F7CAC9',
    '🎉 Evento': '#F7CAC9',
    '🏠 Casa': '#F7CAC9',
    '💤 Sonno': '#F7CAC9',
    '🧹 Pulizia': '#F7CAC9',
    '🍫 Snack': '#AED6F1',
    '📚 Libri di testo': '#A3E4D7',
    '📝 Appunti': '#A3E4D7',
    '📐 Materiali scolastici': '#A3E4D7',
    '📖 Compiti': '#A3E4D7',
  };


  const tagCategories = [
    {
      name: 'Spesa',
      tags: ['🛒 Ingredienti', '🍞 Pane', '🍎 Frutta', '🥦 Verdure', '🧀 Latticini', '🥖 Panetteria', '🥩 Carne', '🍷 Bevande', '🍫 Snack', '🥕 Prodotti per la pulizia'],
    },
    {
      name: 'Lavoro',
      tags: ['💼 Lavoro', '📅 Scadenza', '💻 Progetto', '📈 Rapporto', '✉️ Email', '📑 Documenti', '📊 Riunioni', '📔 Note', '💡 Idee', '📝 Compiti'],
    },
    {
      name: 'Tempo Libero',
      tags: ['📺 Serie TV', '🎬 Film', '🎮 Giochi', '🎵 Musica', '🏞️ Attività fuori', '📚 Lettura', '🚴 Sport', '🏊 Piscina', '🍔 Ristorante'],
    },
    {
      name: 'Altro',
      tags: ['📦 Altro', '🎉 Evento', '🏠 Casa', '💤 Sonno', '🧹 Pulizia', '🚗 Trasporti', '🌍 Viaggi', '📅 Appuntamenti', '📷 Fotografia', '🛋️ Shopping'],
    },
    {
      name: 'Scuola',
      tags: ['📚 Libri di testo', '📝 Appunti', '📐 Materiali scolastici', '📖 Compiti'],
    }
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedTags([]); // Reset selected tags when the category changes
  };

  const handleTagSelection = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    }
  };
  const handleEditTagSelection = (tag) => {
    if (editingTags.includes(tag)) {
      setEditingTags(editingTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setEditingTags([...editingTags, tag]);
    }
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

      const updatedTasks = [...tasks, taskWithTimestamp];
      setTasks(updatedTasks);
      setNewTask('');
      setTaskImages({ ...taskImages, [tasks.length]: null });
      localStorage.setItem('tasks', JSON.stringify([...tasks, taskWithTimestamp])); // Salva le attività nel localStorage
      setValidationError(null);
    } else {
      setValidationError('Il campo non può essere vuoto.');
    }
  };
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);


  function TagSelector({ categories, selectedCategory, onSelectCategory, selectedTags, onSelectTag }) {
    return (
      <div className="d-flex align-items-center">
        <div className="col-md-6">
          <label>Seleziona la categoria:</label>
          <select className="form-control" value={selectedCategory || ""} onChange={(e) => onSelectCategory(e.target.value)}>
            <option value=""></option>
            {categories && Array.isArray(categories) && categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label>Seleziona le tag:</label>
          {selectedCategory &&
            categories &&
            Array.isArray(categories) &&
            categories
              .find((category) => category.name === selectedCategory)
              ?.tags.map((tag) => (
                <button
                  key={tag}
                  style={{ backgroundColor: tagColors[tag] || 'black', color: "white" }}
                  className={`btn ${selectedTags.includes(tag) ? 'btn-success' : 'btn-light'}`}
                  onClick={() => onSelectTag(tag)}
                >
                  {tag}
                </button>
              ))}
        </div>
      </div>
    );
  }

  function CategoryTagModal({ show, onClose, categories, selectedCategory, onSelectCategory, selectedTags, onSelectTag }) {
    // ... (Puoi inserire qui il codice per la selezione di categoria e tag)
    return (
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Seleziona Categoria e Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TagSelector
            categories={tagCategories}
            selectedCategory={isEditing ? editSelectedCategory : selectedCategory}
            onSelectCategory={(category) => {
              if (isEditing) {
                setEditSelectedCategory(category);
              } else {
                handleCategoryChange(category);
              }
            }}
            selectedTags={selectedTags}
            onSelectTag={handleTagSelection}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCategoryTagModal}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={() => {
            handleCloseCategoryTagModal(); // Chiudi il modal
            addTask(); // Aggiungi il compito con le categorie e le tag selezionate
          }}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }



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
    const updatedTasks = tasks.filter((_, index) => index !== taskToRemove);
    setTasks([]);
    setTaskImages({});
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setShowModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
    setTaskToRemove(null);
  };

  const editTask = (index) => {
    setIsEditing(true);
    setEditingTask(index);
    setNewTask(tasks[index].text);
    setTaskDeadline(tasks[index].deadline || '');
    setEditingTags([...tasks[index].tags]);
    setEditSelectedCategory(selectedCategory);
  };




  const saveEditedTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editingTask] = {
        ...updatedTasks[editingTask],
        text: newTask,
        deadline: taskDeadline,
        tags: [...editingTags], // Usa le tag selezionate durante la modifica
      };
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setEditingTask(null);
      setNewTask('');
      setTaskDeadline('');
      setEditingTags([]); // Reimposta le tag selezionate durante la modifica
      setIsEditing(false);
      setEditSelectedCategory('');
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
  const [showCategoryTagModal, setShowCategoryTagModal] = useState(false);
  const handleCloseCategoryTagModal = () => {
    setShowCategoryTagModal(false);
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
        <button className="btn btn-primary" onClick={() => setShowCategoryTagModal(true)}>
          Seleziona Categoria e Tags
        </button>
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={addTask}>
            <BiPlus />
          </button>
          <button className="btn btn-danger ml-1" onClick={handleRemoveAll}>
            <MdDelete />
          </button>
        </div>
      </div>
      <CategoryTagModal
        show={showCategoryTagModal}
        onClose={handleCloseCategoryTagModal}
        categories={tagCategories}
        selectedCategory={isEditing ? editSelectedCategory : selectedCategory}
        onSelectCategory={(category) => {
          if (isEditing) {
            setEditSelectedCategory(category);
          } else {
            handleCategoryChange(category);
          }
        }}
        selectedTags={selectedTags}
        onSelectTag={handleTagSelection}
      />
      {validationError && <div className="text-danger">{validationError}</div>}
      {/*<TagSelector
        categories={tagCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        selectedTags={selectedTags}
        onSelectTag={handleTagSelection}
        />*/}
      <div className="border-color-selector">
        <label>Scegli il colore del bordo:</label>
        <select
          value={selectedBorderColor === null ? '' : selectedBorderColor}
          onChange={(e) => handleBorderColorChange(e.target.value)}
          style={{ borderColor: selectedBorderColor === '' ? '#f0f8ff' : selectedBorderColor }}
        >
          <option value="">Predefinito</option>
          {customBorderColors.map((colorOption) => (
            <option key={colorOption.color} value={colorOption.color}>
              {colorOption.name} {colorOption.emoji}
            </option>
          ))}
        </select>
      </div>
      <ul className="list-group" >
        {tasks
          /*.filter((task) => {
            const hasSelectedTag = selectedTags.some((tag) => task.tags.includes(tag));
            const isCategoryMatch =
              selectedCategory === '' || tagCategories.find((category) => category.name === selectedCategory).tags.includes(task.tags[0]);
            return hasSelectedTag && isCategoryMatch;
          })*/ /*FILTRO PER LE TAG*/
          .map((task, index) => (
            <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''}`} style={{
              border: selectedBorderColor ? `2px solid ${selectedBorderColor}` : 'lightgray',
            }}>
              {isEditing && editingTask === index ? (
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
                  <TagSelector
                    categories={tagCategories}
                    selectedCategory={isEditing ? editSelectedCategory : selectedCategory}
                    onSelectCategory={(category) => {
                      if (isEditing) {
                        setEditSelectedCategory(category);
                      } else {
                        handleCategoryChange(category);
                      }
                    }}
                    selectedTags={editingTags} // Usa le tag selezionate durante la modifica
                    onSelectTag={handleEditTagSelection} // Usa la funzione per gestire la selezione delle tag durante la modifica
                  />
                  <button className="btn btn-success btn-category-tag" onClick={saveEditedTask}>
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
              <label htmlFor={`file-input-${index}`} style={{ marginTop: "10px" }}>
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
        <Modal.Body>Task rimossa/e con successo.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirmationModalClose}>
            Torna indietro
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
