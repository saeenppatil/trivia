import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.signIn(email, password);
      navigate('/home'); // Navigate to home page upon successful login
    } catch (err: any) {
      setError(err.message); // Display the error message on failed login
    }
  };

  const handleRegisterNavigation = () => {
    navigate('/register'); // Navigate to register page
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label className='label'>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='label'>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account?</p>
        <button onClick={handleRegisterNavigation}>Register</button>
      </div>
    </div>
  );
};

export default Login;

