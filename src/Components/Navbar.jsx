import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [user,setUser] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:8989', { withCredentials: true })
            .then(result => {
                if (result.data.Status === 'success') {
                    
                    setUser(result.data.name);
                } else {
                    
                    navigate('/login');
                }
            })
            .catch(() => {
                console.log('user cannot get');
            });
    }, [navigate]);

    const logout = () => {
        axios.get('http://localhost:8989/logout', { withCredentials: true }) 
        .then(() => {
            navigate('/login'); 
        })
        .catch(err => console.error("Logout error:", err));
    };
    
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My Access</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userinfo">User Info</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adduser">Add New User</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            
            <li className="nav-item">
              <button className="nav-link" onClick={logout}>
                <i className="bi bi-person"></i> Log Out
              </button>
            </li>
          </ul>

          <h1 className='userlogo rounded-circle'>
                {user.slice(0,1)}
            </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
