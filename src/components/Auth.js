import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { register, login, loading } = useAuth();
    const navigate = useNavigate();

    const handleAuth = async (e, type) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage('Email and password are required.');
            return;
        }
        try {
            if (type === 'login') {
              await login(email, password);
            } else if (type === 'register') {
              await register(email, password);
            }
           navigate('/');
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    if(loading) {
        return <Loading message={"Loading"}/>
    }


  return (
      <div >
        <h2>Welcome!</h2>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => handleAuth(e, 'login')}>Login</button>
        <button onClick={(e) => handleAuth(e, 'register')}>Register</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
  );
};

export default Auth;