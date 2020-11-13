import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  function historique() {
    fetch("http://localhost:8080/historique")
    .then(res => res.json())
    .then(
      (result) => {
        setMessages(result);
      },
      (error) => {
        setMessages("aie");
      }
    )
  }

  useEffect(() => {
    historique();
  }, [])

  return (
    <div className="App">
        <div className="top-container">
          {messages.map(item => (
            <div className="line-summary">
              <span>{item.nom}</span> <span>:</span> <span>{item.message}</span>
            </div>
            ))
          }
        </div>
        <div className="bottom-container">
          <div className="text">
          </div>
          <div className="name">

          </div>
          <div className="button">

          </div>
        </div>
    </div>
  );
}
export default App;