import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddBlogForm from './AddBlogForm';
import Modal from 'react-modal';
import Navbar from './Navbar';
import './styles.css'; // Import CSS file

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null); // Track selected blog for editing
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5286/api/Blogs');
        setBlogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBlogs();
  }, [blogs]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5286/api/Blogs/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

//   const handleAddBlog = (newBlog) => {
//     setBlogs([...blogs, newBlog]);
//   };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setEditTitle(blog.title);
    setEditDescription(blog.description);
    setModalIsOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBlog = { ...selectedBlog, title: editTitle, description: editDescription };
      await axios.put(`http://localhost:5286/api/Blogs/${selectedBlog.id}`, updatedBlog);
      setModalIsOpen(false);
      // Update the blogs state to reflect changes
      const updatedBlogs = blogs.map(blog => (blog.id === selectedBlog.id ? updatedBlog : blog));
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (

    
    <div className="container">
        <Navbar />
      <h1 className="title">Welcome to My Blog</h1>
      <div className="blog-list">
        {blogs.map(blog => (
          <div className="blog-card" key={blog.id}>
            <h2 className="blog-title"><a href={`blogs/${blog.id}`}>{blog.title}</a></h2>
            {/* <p className="blog-description">{blog.description}</p> */}
            <p className="blog-description">{blog.description.substring(0, 100)}</p>

            <div className="btn-group">
              <button className="edit-btn" onClick={() => openEditModal(blog)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(blog.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
       {/* <AddBlogForm />  */}
       {/* <AddBlogForm onAdd={handleAddBlog} />   */}
       {/* <button onClick={openModal} className="add-new-blog-btn">Add New Blog</button>  */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Blog Modal"
      >
        <h2>Edit Blog</h2>
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <input className="edit-input" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
          <textarea className="edit-textarea" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} required />
          <div className="edit-buttons">
          <button className="save-button" type="submit">Save Changes</button>
          <button className="close-button" type="ok" onClick={closeModal}>Close</button>
          </div>
        </form>
        
      </Modal>
    </div>
  );
}

export default Home;
