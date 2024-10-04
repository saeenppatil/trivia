import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () => {
    const [data, setData] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/');
                const textData = await response.text();
                setData(textData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setData('Failed to fetch data');
            }
        };

        fetchData();
    }, []);


  const categories = [
    {title: 'All', image: 'all.webp'},
    {title: 'Science', image: 'science.png'},
    {title: 'Geography', image: 'geography.png'},
    {title: 'Sports', image: 'sports.png'},
    {title: 'Entertainment', image: 'entertain.png'},
    {title: 'History', image: 'history.png'}
  ];

    return (
      <div className="app">

       {/* Navigation Bar */}
       <nav className="navbar">
        <div className="nav-left">
          <img src="logo.svg" alt="Icon" className="nav-icon" />
        </div>
        <div className="nav-right">
          <a href="/login" className="nav-link">Login</a>
          <a href="/register" className="nav-link">Register</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-box">
          <h1 className="title">Trivia Scope</h1>
          <div className="categories">
            {categories.map((category, index) => (
              <button key={index} className="category-button">
                <img src={category.image} alt={category.title} className="category-image" />
                <span className="category-title">{category.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
    );
};

export default App;
