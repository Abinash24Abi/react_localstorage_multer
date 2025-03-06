import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';


const UserInfo = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8989/getuser')
            .then((result) => {
                console.log(result);
                setUser(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
        <Navbar />
        <div className="user-container">
           
            <h1 className="user-title">User Information</h1>

            <div className="table-wrapper">
                <table className="user-table">
                    <thead>
                        <tr className="table-header">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No</th>
                            <th>Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => (
                            <tr key={index} className="table-row">
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phno}</td>
                                <td>
                                    <img 
                                        src={`http://localhost:8989/${user.img}`} 
                                        alt="Profile" 
                                        className="profile-img"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default UserInfo;
