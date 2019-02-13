import React, { Component } from 'react';
import Venues from './Venues';

class Sidebar extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: '',
      venues: []
    }
  }
 
  componentDidMount() {
     

  }  
  

  onQueryChange = (query) => {
    this.setState({query});
    const markers = this.props.venues.map((venue) => {
      const matched = venue.name.toLowerCase().includes(query.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      marker.isVisible = matched;
      return marker;      
    });
    this.props.updateAppState({markers});
  }

  onFilterVenues = () => {
    const query = this.state.query;
    if(query.trim() !== ''){
        const venues = this.props.venues.filter((venue) => {
          return venue.name.toLowerCase().includes(query.toLowerCase());
        });
       return venues;
    }
    return this.props.venues;
  }


  render() { 

    return (
       <div className='sidebar'>
          <div className="sidebar-header">
           <h1>Restaurants</h1>
          </div>  
          <input value={this.state.query} type={"search"} id={"search"}  placeholder={"Filter venues"} onChange={ (event) => this.onQueryChange(event.target.value)} />
           <div className="sidebar-body"> 
              <Venues {...this.props} venues={this.onFilterVenues()} onVenueClicked={this.props.onVenueClicked} ></Venues>
           </div>
       </div>
    );
  }
}

export default Sidebar;
