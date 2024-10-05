import React, {ReactNode} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Trivia from './pages/Trivia/TriviaTest';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './components/common/Navbar';


function App() {
  return (
    // Wrap your app with FirebaseAppProvider for Firebase services
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/trivia/:categoryId" element={<Trivia />} />
          </Routes>
        </div>
  );
}

export default App;
