import React, { Component } from 'react';
import Venue from './Venue';

class Venues extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: ''
    }
  }
 

  componentDidMount() {
 

  }  
 

  render() { 


     

    return (
       <ol  className='venues' >
          {
            this.props.venues && this.props.venues.map((venue, index) => 
                (<Venue key={index} {...venue} onVenueClicked={this.props.onVenueClicked}></Venue>)  
            )
          }
       </ol>
    );
  }
}

export default Venues;
