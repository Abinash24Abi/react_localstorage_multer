import axios from 'axios';
import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

function Signup() {
    const nav = useNavigate();
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password === formData.confirmPassword){

        axios.post('http://localhost:8989/post',formData)
    .then((result) => {
        if(result.data.Message === 'done')
        {
        alert("Account Created");
       nav('/')
        }
    })
    .catch((err) =>{
        alert("error for Account Created");
    })

    }
    else{
        alert("password cannot match");
    }
    
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Signup</h1>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your Name"
          required
          className="form-input"
        />
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
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="form-input"
        />
        <button type="submit" className="form-button">Signup</button>
        <p>Already have an Account ? <Link to='/login'>Login</Link></p>
      </form>
    </div>
  );
}

export default Signup;
