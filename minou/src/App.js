import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import SimpleMap from './SimpleMap';
import { ReactComponent as Tractor } from './img/tractor.svg';

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

  
  function prout(x, y, lat, lng, event) {
    console.log(x, y, lat, lng, event);
  }
  
  function prout2(map, maps) {
    console.log("yeah !");
  }

  return (
    <div className="App">
      <div className="top-container">
        <SimpleMap 
          click={prout}
          handleApiLoaded={prout2}
        ></SimpleMap>
      </div>
      <div className="bottom-container">
        <Tractor className="tractor green"/>
        <Tractor className="tractor blue"/>
        <Tractor className="tractor red"/>
      </div>
    </div>
  );
}
export default App;