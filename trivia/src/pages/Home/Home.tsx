import React, { useState, useEffect, useRef } from 'react';
import './Home.css'
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../components/common/Navbar';

const Home: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [selectedCate, setCate] = useState<string>('0');
  const qRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); 

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
    { id: '0', title: 'General', image: 'all.webp' },
    { id: '17', title: 'Science', image: 'science.png' },
    { id: '22', title: 'Geography', image: 'geography.png' },
    { id: '21', title: 'Sports', image: 'sports.png' },
    { id: '11', title: 'Entertainment', image: 'entertain.png' },
    { id: '23', title: 'History', image: 'history.png' }
  ];

  const sendCate = (id: string) => {
    setCate(id);
    navigate(`/trivia/${id}`); 
  };

  return (
    <div className="app">
      <div className="select">
        <div className="main-content">
          <div className="content-box">
            <h1 className="title">Trivia Scope</h1>
            <div className="categories">
              {categories.map((category, index) => (
                <button key={index} className="category-button" onClick={() => sendCate(category.id)}>
                  <img src={category.image} alt={category.title} className="category-image" />
                  <span className="category-title">{category.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="questions" ref={qRef}>
      </div>
    </div>
  );
};

export default Home;
