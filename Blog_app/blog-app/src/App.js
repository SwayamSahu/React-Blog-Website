import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
const [blogs, setBlogs] = useState([]);

useEffect(() => {
const fetchBlogs = async () => {
try {
const response = await axios.get('http://localhost:5286/api/Blogs');
setBlogs(response.data);
} catch (error) {
console.error('Error fetching data:', error);
}
};

fetchBlogs();
}, []);

return (
<div>
<h1>Blog Posts</h1>
<ul>
{blogs.map(blog => (
<li key={blog.id}>
<h2>{blog.title}</h2>
<p>{blog.description}</p>
</li>
))}
</ul>
</div>
);
}

export default Home;