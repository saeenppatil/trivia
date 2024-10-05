import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import './Register.css'; // Make sure to link this to your CSS file

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.signUp(email, password);
      navigate('/home'); // Navigate to home page upon successful registration
    } catch (err: any) {
      setError(err.message); // Display the error message on failed registration
    }
  };

  const handleLoginNavigation = () => {
    navigate('/login'); // Navigate to login page
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <div>
            <label className="label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account?</p>
        <button onClick={handleLoginNavigation}>Login</button> {/* Button for navigation to login page */}
      </div>
    </div>
  );
};

export default Register;
