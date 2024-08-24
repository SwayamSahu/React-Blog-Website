import React from 'react';
import AddBlogForm from './AddBlogForm';
import './Navbar.css';

function Navbar({ onAdd }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" >Narrative Nook</a>
        <AddBlogForm />  
        {/* <button onClick={onAdd} className="btn btn-primary ml-auto">Add New Blog</button> */}
      </div>
    </nav>
  );
}

export default Navbar;

