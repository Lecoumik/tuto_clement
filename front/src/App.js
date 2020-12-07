import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import SimpleMap from './SimpleMap';
import { ReactComponent as Tractor } from './img/tractor.svg';

function App() {
  const [gpsPoints, setGpsPoints] = useState( null );

  function getAllGpsPoints() {
    fetch("http://localhost:8080/gpsAll")
    .then(res => res.json())
    .then(
      (result) => {
        setGpsPoints(result);
      },
      (error) => {
        setGpsPoints( ["no gps points founded"] );
      }
    )
  }

  useEffect(() => {
    getAllGpsPoints();
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
          gpsPoints={gpsPoints}
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