import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState( [] );
  const [name, setName] = useState( "" );
  const [message, setMessage] = useState( "" );

  function historique() {
    fetch("http://localhost:8080/historique")
    .then(res => res.json())
    .then(
      (result) => {
        setMessages(result);
      },
      (error) => {
        setMessages( [] );
      }
    )
  }

  function sendMessage() {
    if(!name || !message)
      return false;
    console.log("sendMessage");
    var url = name+"/"+message;
    fetch("http://localhost:8080/sendMessage/"+url)
    .then(res => res.json())
    .then(
      (result) => {
        historique();
      },
      (error) => {
      }
    )

  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeMessage(e) {
    setMessage(e.target.value);
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
          <textarea key="name" className="text" onChange={handleChangeName}>{name}</textarea>
          <textarea key="message" className="name" onChange={handleChangeMessage}>{message}</textarea>
          <button  onClick={() => sendMessage()} className="button">envoyer</button>
          <button  onClick={() => historique()} className="button">refresh</button>
        </div>
    </div>
  );
}
export default App;