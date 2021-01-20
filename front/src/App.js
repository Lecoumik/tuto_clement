import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import SimpleMap from './SimpleMap';
import { ReactComponent as Tractor } from './img/tractor.svg';
// import MapContainer from './MapContainer';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMap from './GoogleMap';


function App() {
  const [gpsPoints, setGpsPoints] = useState( null );
  const [checkbox, setCheckbox] = useState([]);
  const [google, setGoogle] = useState(null); 
  

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

  function googleMapRef() {
    useRef();
  }

  return (
    <div className="App">
      <div className="top-container">

      <GoogleMap></GoogleMap>

      <div
          id="google-map"
          ref={googleMapRef}
          style={{ width: '400px', height: '300px' }}/>

      <Map google={google} zoom={14}>

      {/* <Marker onClick={this.onMarkerClick}
              name={'Current location'} /> */}

      {/* <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
      </InfoWindow> */}
      </Map>
        {/* <MapContainer></MapContainer> */}

        {/* <SimpleMap 
          click={prout}
          handleApiLoaded={prout2}
          gpsPoints={gpsPoints}
        ></SimpleMap> */}
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