import React, { Component } from 'react';
import {generate_google_maps} from './utils/generate_google_maps'
import {generate_places} from './utils/generate_places'
import './App.css'
import Sidebar from  './Sidebar'
import Map from  './Map'

class App extends Component {  

  constructor (props){
    super(props);
    this.state = {
      venues: [],
      filteredVenues: []
    }
  }

 componentDidMount() {
      
    let gmapPromise = generate_google_maps();
    let placesPromise = generate_places();

    Promise.all([gmapPromise, placesPromise]).then(values => {
      let google  = values[0]; 
      this.venues = values[1];
      this.google = google;
      this.markers = [];

      const node = document.getElementById('map');

      this.map  = new google.maps.Map(node, {
          zoom: 9, 
          scrollwheel: true, 
          center: {lat: this.venues[0].location.lat, lng: this.venues[0].location.lng}
      }); 

      this.infoWindow = new google.maps.InfoWindow({
        content: ''
      });

      this.venues.forEach(venue => {
        let marker  = new google.maps.Marker({
            position : {lat : venue.location.lat, lng: venue.location.lng},
            map : this.map, 
            venue: venue, 
            name: venue.name, 
            id:  venue.id,
            animation:google.maps.Animation.DROP
        }); 

        marker.addListener('click', () => {
          this.bounceMarker(marker);
        }); 

        google.maps.event.addListener(marker, 'click', () => {
            this.selectMarker(marker);
        });
        
        this.markers.push(marker);

      })

      this.setState({filteredVenues: this.venues});

    })
  }  

  state = {
    query: '',
    venues:[],
    filteredVenues:[]
  }


  filterPlaces = (q) => {  
  
      let filteredVenues = this.venues.filter((venue) => {
        return venue.name.toLowerCase().includes(q.toLowerCase());
      });

      this.setState({filteredVenues:filteredVenues, query: q});

      this.markers.forEach((m) => {
          m.setVisible(m.name.toLowerCase().includes(q.toLowerCase()));
      });

  } 


  selectMarker = (marker) => {
     this.infoWindow.setContent(marker.name);
     this.map.setCenter(marker.position);
     this.infoWindow.open(this.map, marker);
     this.map.panBy(0, -125);
  }

   bounceMarker = (marker) => {
      if(marker.getAnimation() !== null){
        marker.setAnimation(null);
      }else {
        marker.setAnimation(this.google.maps.Animation.BOUNCE);
      }
      setTimeout(() => { marker.setAnimation(null)}, 1000);
   }


  venueClicked = (venue) => {
     let markers = this.markers.filter((m) => {
          return m.id === venue.id;
     }); 
     this.selectMarker(markers[0]);
     this.bounceMarker(markers[0]);
  }

  render() { 

    return (
      <div>
        <Map></Map>
        <Sidebar 
            filteredVenues={this.state.filteredVenues} 
            venueClicked={this.venueClicked} 
            filterPlaces={this.filterPlaces}>
        </Sidebar>
      </div>
    )
  }

}

export default App;
