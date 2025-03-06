import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8989/login', formData, { withCredentials: true })
            .then((result) => {
                if (result.data.Status === 'success') {
                    navigate('/');
                } else {
                    alert(result.data.Message);
                }
            })
            .catch(err => console.error("Login error:", err));
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h1>Login</h1>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="form-input"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="form-input"
                />
                <button type="submit" className="form-button">Login</button>
                <p>Don't Have an Account ? <Link to='/signup'>Registor</Link></p>
            </form>
          
        </div>
    );
}

export default Login;
