import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 43.601906093600356,
      lng: 1.4440669077215906
    },
    zoom: 13
  };



  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          onClick={this.props.click}
          bootstrapURLKeys={{ key: "AIzaSyBK94YavQZF05dUl2lc5pxVA2XD7XHjfqU" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        //   onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
        //   yesIWantToUseGoogleMapApiInternals
        >
          <AnyReactComponent
            lat={43.60583302304571}
            lng={1.448622119013915}
            text="Départ"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;