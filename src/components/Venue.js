import React, { Component } from 'react';
class Venue extends Component {

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
        <li className="venue" onClick={() => this.props.onVenueClicked(this.props)}>
            {
              this.props.categories && this.props.categories.length > 0 && this.props.categories[0].icon && (
              <img src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix} alt={this.props.categories[0].name} />)
            }
            {this.props.name}
        </li> 
    );
  }
}

export default Venue;
