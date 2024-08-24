// Blog.js
import React from 'react';
import { useEffect ,useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Blog.css';

function Blog({ title, description }) {
    const [blogs, setBlogs] = useState([]);
    const {blogId} = useParams();

    useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const response = await axios.get(`http://localhost:5286/api/Blogs/${blogId}`);
            setBlogs(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchBlogs();
      }, [blogs]);
  return (
    <div className="blog">
      <h2 className="blog-title">{blogs.title}</h2>
      <p className="blog-description">{blogs.description}</p>
    </div>
  );
}

export default Blog;
