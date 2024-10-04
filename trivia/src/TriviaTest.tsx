import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TriviaTest.css'; // Ensure the CSS is in place

interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface TriviaData {
  response_code: number;
  results: TriviaQuestion[];
}

interface Props {
  categoryId: string;
}

const Trivia: React.FC<Props> = ({ categoryId }) => {
  const [trivia, setTrivia] = useState<TriviaQuestion[]>([]);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const cates: { [key: string]: string } = {
    '0': 'General Trivia',
    '17': 'Science Trivia',
    '11': 'Entertainment Trivia',
    '21': 'Sports Trivia',
    '22': 'Geography Trivia',
    '23': 'History Trivia',
    // Add more categories as needed
  };

  const decode = (html: string): string => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const response = await axios.get<TriviaData>(`http://localhost:3001/api/trivia/${categoryId}`);
        const decodedRes = response.data.results.map((item) => ({
            ...item,
            question: decode(item.question),
            correct_answer: decode(item.correct_answer),
            incorrect_answers: item.incorrect_answers.map((answer) => decode(answer)),
          }));
        setTrivia(decodedRes);
      } catch (error) {
        console.error('Failed to fetch trivia:', error);
      }
    };
  
    fetchTrivia();
  }, [categoryId]);

  const handleAnswer = (questionIndex: number, answer: string) => {
    if (!completed) { 
      setAnswers(new Map(answers).set(questionIndex, answer));
    }
  };

  const submitAnswers = () => {
    let newScore = 0;
    trivia.forEach((item, index) => {
      if (answers.get(index) === item.correct_answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setCompleted(true);
  };

  return (
    <div className="trivia-container">
      <h2 className="trivia-title">{cates[categoryId] || 'Unknown Category'}</h2>
      {!completed ? (
        <ul>
          {trivia.map((item, index) => (
            <li key={index} className="trivia-item">
              <strong>{item.question}</strong>
              <ul className="answer-list">
                {item.incorrect_answers.concat(item.correct_answer).sort().map((answer, idx) => (
                  <li key={idx} className={`answer ${answers.get(index) === answer ? 'selected' : ''}`}
                      onClick={() => handleAnswer(index, answer)}>
                    {answer}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <button onClick={submitAnswers} className="end-button">Submit Answers</button>
        </ul>
      ) : (
        <div className="score-board">
          {trivia.map((item, index) => (
            <div key={index} className="review-item">
              <strong>{item.question}</strong>
              <ul className="answer-list">
                {item.incorrect_answers.concat(item.correct_answer).map((answer, idx) => (
                  <li key={idx} className={`answer ${answers.get(index) === answer ? (answer === item.correct_answer ? 'correct' : 'incorrect') : ''}`}>
                    {answer}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <h2 className="score">Your Score: {score}/{trivia.length}</h2>
          <button onClick={() => {setCompleted(false); setAnswers(new Map()); }} className="end-button">Retry</button>
        </div>
      )}
    </div>
  );
}

export default Trivia;