import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//port logo from './logo.svg';
import OSUlogo from './osu-logo-reversed-update.png';
//import ODOTlogo from './ODOT20logo.jpg';
import './App.css';
import icon from './icon.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      navHome: "active",
      navUpload: "nonactive",
      navNTD: "nonactive",
      navViz: "nonactive"
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
    ReactDOM.render(<h1>Welcome to WebHub!</h1>, document.getElementById('contentPanel'));
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

  ntdReport = (e) => {
    this.setState({
      navHome: "nonactive",
      navUpload:"nonactive",
      navabout:"nonactive",
      navNTD:"active",
      navViz:"nonactive"
    });
    ReactDOM.render("ntdReporting", document.getElementById('contentPanel'));
  }

  mapViz = (e) => {
    this.setState({
      navHome: "nonactive",
      navUpload:"nonactive",
      navabout:"nonactive",
      navNTD:"nonactive",
      navViz:"active"
    });
    ReactDOM.render("viz", document.getElementById('contentPanel'));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logos">
            <img src={OSUlogo} className="OSU-logo" alt="OSUlogo" />
          </div>
          <img src={icon} className="ride-logo" alt="ridelogo" />
          <div className="App-title">WebHub</div>
        </header>
        <div className="AllContent">
          <div className="leftVerticalBar">
            <div className="nav">
                <div className="panelDef">Navigation</div>
                <ul>
                  <li>
                      <a  className={this.state.navHome} onClick={this.home} href="#home">Home</a>
                  </li>
                  <li><a  onClick={this.upload}  className={this.state.navUpload} href="#Upload">Upload</a></li>
                  <li><a  onClick={this.ntdReport}  className={this.state.navNTD} href="#NTD">NTD Reporting</a></li>
                  <li><a  onClick={this.mapViz}  className={this.state.navViz} href="#MapViz">Map Viz</a></li>
                </ul>
            </div>
            <div className="footer">&copy; Copyright Oregon State University 2018</div>
          </div>
          <div id="contentPanel" className="contentPanel">
          
             <h1>Welcome to WebHub!</h1>
          
          </div>
        </div>
      </div>
    );
  }
}

export default App;
