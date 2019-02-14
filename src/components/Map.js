/* global google */

import React, { Component, Fragment} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    zoom={props.zoom}
    center={props.center}
    defaultCenter={{ lat: -34.397, lng: 150.64 }}
  >
    {
      props.markers && 
        props.markers
        .filter(marker => marker.isVisible)
        .map((marker, index, array) => {
          const venueDetail = props.venues.find(v => v.id === marker.id);   
          return (
            <Marker
            key={index} 
            position={{ lat: marker.lat, lng: marker.lng }} 
            onClick={() => props.onMarkerClicked(marker)}
            animation={array.length === 1? google.maps.Animation.BOUNCE: google.maps.Animation.DROP}
            >
             {marker.isOpen && 
                (
                <InfoWindow tabIndex="0">
                    <Fragment>
                      {venueDetail.bestPhoto && (<img src={`${venueDetail.bestPhoto.prefix}200x200${venueDetail.bestPhoto.suffix}`} alt={venueDetail.name}/>)}
                      <p>{venueDetail.name}</p>
                    </Fragment>
                </InfoWindow>
                )
            }
          </Marker>
          )
          })
    }
  </GoogleMap>
))
 
export default class Map extends Component {
  render() {
    return (
        <MyMapComponent
          {...this.props}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyD3wM3J0IL1Jz77Nda1xTgyLrquXUAgAks"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: `75%` }} />}
          mapElement={<div id="map" aria-label="location" role="application" style={{ height: `100%` }} />}/>
    )
  }
}

 