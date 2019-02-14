import React, { Component } from 'react';
import SquareAPI from './utils/SquareAPI'
import './App.css'
import Sidebar from  './components/Sidebar'
import Map from  './components/Map'

class App extends Component {  

  constructor (props){
    super(props);
    this.state = {
      venues: [], 
      markers: [],
      center: [],
      zoom: 12,
      updateAppState : obj => {
        this.setState(obj);
      }
    }
  } 


  onMarkerClicked = (marker) =>  {
    this.closeAllMarkers();
    marker.isOpen = true; 
    this.setState({markers: Object.assign(this.state.markers, marker)});
    const venue = this.state.venues.find(v => v.id  ===  marker.id);
    SquareAPI.getVenueDetails(marker.id).then(res => {
        const merged = Object.assign(venue,res.response.venue);
        this.setState({venues: Object.assign(this.state.venues, merged)});
    });
  } 

  onVenueClicked = (venue) => {
    const marker = this.state.markers.find(m => m.id === venue.id);
    this.onMarkerClicked(marker);
  }

  closeAllMarkers = ()  => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  }

  componentDidMount() {
        SquareAPI.search({
           near: "Frederick, MD",
           query: "Restaurant",
           limit: "15"
        }).then(results => {

          const {venues} = results.response;
          const {center} = results.response.geocode.feature.geometry;
          const markers = venues.map(venue => {
              return {
                lat: venue.location.lat,
                lng: venue.location.lng,
                isOpen: false, 
                isVisible: true,
                id: venue.id
              };
          })

          this.setState({venues, center, markers});

        });
  }  

  

  render() { 

    return (
      <div className="App">
        <Sidebar {...this.state} onVenueClicked={this.onVenueClicked} ></Sidebar>
        <Map {...this.state} onMarkerClicked={this.onMarkerClicked}></Map>
      </div>
    )
  }

}

export default App;
