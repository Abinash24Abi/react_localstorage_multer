import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8989', { withCredentials: true })
            .then(result => {
                if (result.data.Status === 'success') {
                    setAuth(true);
                } else {
                    setAuth(false);
                    navigate('/login');
                }
            })
            .catch(() => {
                setAuth(false);
                navigate('/login');
            });
    }, [navigate]);

    return (
        <>
         <Navbar />
        <div className="home-container">
           
            {auth ? (
                <div className="home-content">
                    <h1>Welcome to the Dashboard</h1>
                    <p>This is your secure space.</p>

                   
                </div>
            ) : (
                <h1 className="redirect-text">Redirecting to login...</h1>
            )}
        </div>
        </>
    );
};

export default Home;
