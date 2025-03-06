import axios from 'axios';
import React, { useState } from 'react';
import Navbar from './Navbar';


const Adduser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phno: '',
        img: null
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const onsetimg = (e) => {
        setUser({ ...user, img: e.target.files[0] });
    };

    const send = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('phno', user.phno);
        formData.append('img', user.img);

        try {
            const result = await axios.post('http://localhost:8989/adduser', formData);
            console.log(result.data);
            alert("submited successfully ...");
            setUser({
                name: '',
                email: '',
                phno: '',
                img: null
            }
            )
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />
           
        <div className="adduser-container">
        
            <h1 className="adduser-title">Add New User</h1>
            <form className="adduser-form">
                <div className="form-group">
                    <label>User Name:</label>
                    <input type="text" name="name" value={user.name} onChange={onChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" name="email" value={user.email} onChange={onChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label>Mobile No:</label>
                    <input type="text" name="phno" value={user.phno} onChange={onChange} className="form-input" />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input type="file" name="img" onChange={onsetimg} className="form-input-file" />
                </div>
                <div className="form-group-btn">
                    
                    <button onClick={send} className="submit-btn">Submit</button>

                </div>
            </form>
        </div>
        </>
    );
};

export default Adduser;
