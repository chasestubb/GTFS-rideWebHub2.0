import React from 'react';
import busImage from './transitImage.jpg';
import './home.css';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    
  };

  componentWillUnmount() {
  
  };
  render(){
    return (
      <div className="HomeContent">
        <div className="busImageContainer">
          <img src={busImage} className="busimage" alt="BusImage" style={{"width":"100"}}/>
          <div className="centeredCaption">
            <a href="http://mime.oregonstate.edu/partnering-better-transit-planning" target="#">“The GTFS-ride data standard will make it possible for organizations at all levels to get easy access to detailed ridership data.”</a>
          </div>
        </div>
        <div className="Description">
          <p>
            <strong>GTFS-ride</strong> is an open, 
            fixed-route transit ridership data standard developed through a partnership between the Oregon Department of 
            Transportation and Oregon State University. GTFS-ride allows for improved ridership data collection, 
            storing, sharing, reporting, and analysis.The standard uses the required elements of GTFS and adds 
            files necessary for ridership data standardization and reporting. GTFS-ride allows transit agencies 
            to share their ridership data with other agencies and organizations interesting in collecting and analyzing 
            ridership data.
          </p>
          <p>
            The <strong>WebHub</strong> is an open source software suite for the support of the GTFS-ride data 
            standard. This suite consists of a Validation tool, upload archival system, tabular reports module, and on map visualization module.
          </p>
        </div>
      </div>
    );
  }
};

export default Home;