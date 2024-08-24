import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './AddBlogForm.css'; // Import CSS file

function AddBlogForm() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5286/api/Blogs', { title, description });
      setTitle('');
      setDescription('');
      closeModal();
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div>
      <button onClick={openModal} className="btn btn-primary">Add New Blog</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add New Blog Modal"
        ariaHideApp={false} // For warning in development mode
      >
        <h2>Add New Blog Posts</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control-title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control-desc" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>
          <div className="button-container">
          <button type="submit" className="btn btn-primary">Add Blog</button>
          <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddBlogForm;
