import React, { Component } from 'react';
import {generate_places} from './utils/generate_places'
import './App.css'
class Sidebar extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: ''
    }
  }
 

  componentDidMount() {
 

  }  
 

  render() { 

    let {filteredVenues} = this.props;
    let {venueClicked} = this.props;
    let {filterPlaces} = this.props;

    return (
       <div id='sidebar'>
          <input  placeholder="Filter..." value={this.state.query} onChange={(event) => filterPlaces(event.target.value)} />
          <br />
            {
             filteredVenues && filteredVenues.length > 0 && filteredVenues.map((venue, index) => (
               
                <div onClick={(event) => {venueClicked(venue)}} key={index} className="venue-element">
                    {venue.name}
                </div>
            ))
           }
       </div>
    );
  }
}

export default Sidebar;
