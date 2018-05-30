import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OSUlogo from './osu-logo-reversed-update.png';
import './App.css';
import icon from './icon.png';
import homeIcon from './icon-home.png';
import vizIcon from './data-viz-icon.png';
import uploadIcon from './upload-icon.png';
import reportIcon from './reports-icon.png';
import MyReport from './Tablaeu';
import Home from './home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      navHome: "active",
      navUpload: "nonactive",
      navNTD: "nonactive",
      navViz: "nonactive",
      tablaeuViz:"hidden"
    }
  }
  
  home = (e) => {
    this.setState({
      navHome: "active",
      navUpload:"nonactive",
      navabout:"nonactive",
      navNTD:"nonactive",
      navViz:"nonactive"
    });
    ReactDOM.render(<Home/>, document.getElementById('contentPanel'));
  }
  about = (e) =>{
    this.setState({
      navHome: "nonactive",
      navUpload:"nonactive",
      navabout:"active",
      navNTD:"nonactive",
      navViz:"nonactive"
    });
    ReactDOM.render("about", document.getElementById('contentPanel'));
  }

  upload = (e) =>{
    this.setState({
      navHome: "nonactive",
      navUpload:"active",
      navabout:"nonactive",
      navNTD:"nonactive",
      navViz:"nonactive"
    });
    ReactDOM.render("upload", document.getElementById('contentPanel'));
  }

  Report = (e) => {
    this.setState({
      navHome: "nonactive",
      navUpload:"nonactive",
      navabout:"nonactive",
      navNTD:"active",
      navViz:"nonactive",
    });
    ReactDOM.render("ntdReporting", document.getElementById('contentPanel'));
  }

  mapViz = (req,res) => {
    this.setState({
      navHome: "nonactive",
      navUpload:"nonactive",
      navabout:"nonactive",
      navNTD:"nonactive",
      navViz:"active"
    });

    ReactDOM.render(<MyReport/>, document.getElementById('contentPanel'));

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logos">
            <img src={OSUlogo} className="OSU-logo" alt="OSUlogo" />
          </div>
          <a href="http://www.gtfs-ride.org/" target="#" ><img src={icon} className="ride-logo" alt="ridelogo" /></a>
          <div className="App-title">WebHub</div>
        </header>
        <div className="AllContent">
          <div className="leftVerticalBar">
            <div className="nav">
                <ul>
                  <li>
                    <a className={this.state.navHome} onClick={this.home} href="#Home">
                      <div className="NavElement"><img src={homeIcon} className="home-icon" alt="homeicon" />Home</div>
                    </a>
                  </li>
                  <li>
                    <a  onClick={this.upload}  className={this.state.navUpload} href="#Upload">
                      <div className="NavElement"><img src={uploadIcon} className="upload-icon" alt="uploadicon" />Upload</div>
                    </a>
                  </li>
                  <li>
                    <a  onClick={this.Report} className={this.state.navNTD} href="#Reporting">
                      <div className="NavElement"><img src={reportIcon} className="report-icon" alt="reporticon" />Reporting</div>
                    </a>
                  </li>
                  <li>
                    <a  onClick={this.mapViz}  className={this.state.navViz} href="#MapViz">
                      <div className="NavElement"><img src={vizIcon} className="viz-icon" alt="vizicon" />Map Visualization</div>
                    </a>
                  </li>
                </ul>
            </div>
            <div className="footer">&copy; Copyright Oregon State University 2018</div>
          </div>
          <div id="contentPanel" className="contentPanel">
            <Home/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
