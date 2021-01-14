import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import SimpleMap from './SimpleMap';
import { ReactComponent as Tractor } from './img/tractor.svg';

function App() {
  const [gpsPoints, setGpsPoints] = useState( null );
  const [checkbox, setCheckbox] = useState([]);

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

  function updateCheck(event) {
    if (checkbox.includes(event.target.id)) checkbox.splice(checkbox.indexOf(event.target.id),1);
    else checkbox.push(event.target.id);
    console.log(checkbox);
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
        <div>
          <span className="green">Green</span>
          <input type="checkbox" id="check_green"
              onChange={updateCheck}/>
          <Tractor className="tractor green"/>
        </div>
        <div>
          <span className="blue">Blue</span>
          <input type="checkbox" id="check_blue"
              onChange={updateCheck}/>
          <Tractor className="tractor blue"/>
        </div>
        <div>
          <span className="red">Red</span>
          <input type="checkbox" id="check_red"
              onChange={updateCheck}/>
          <Tractor className="tractor red"/>
        </div>
      </div>
    </div>
  );
}
export default App;