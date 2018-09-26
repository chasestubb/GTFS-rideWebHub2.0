import React, { Component } from 'react';
import OSUlogo from './osu-logo-reversed-update.png';
import './App.css';
import icon from './icon.png';
import homeIcon from './icon-home.png';
import vizIcon from './data-viz-icon.png';
import uploadIcon from './upload-icon.png';
import reportIcon from './reports-icon.png';
import MyReport from './Tablaeu';
import Report from './Reports';
import Upload from './UploadPanel';
import Home from './home';
import { Switch, Route,Link } from 'react-router-dom';
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
  }
  
  about = (e) =>{
    this.setState({
      navHome: "nonactive",
      navUpload:"nonactive",
      navabout:"active",
      navNTD:"nonactive",
      navViz:"nonactive"
    }); 
  }

  upload = (e) =>{
    this.setState({
      navHome: "nonactive",
      navUpload:"active",
      navabout:"nonactive",
      navNTD:"nonactive",
      navViz:"nonactive"
    }); 
  }

  Report = (e) => {
    this.setState({
      navHome: "nonactive",
      navUpload:"nonactive",
      navabout:"nonactive",
      navNTD:"active",
      navViz:"nonactive",
    }); 
  }

  mapViz = (req,res) => {
    this.setState({
      navHome: "nonactive",
      navUpload:"nonactive",
      navabout:"nonactive",
      navNTD:"nonactive",
      navViz:"active"
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logos">
            <img src={OSUlogo} className="OSU-logo" alt="OSUlogo" />
          </div>
          <a href="http://webhub.gtfs-ride.org/"><img src={icon} className="ride-logo" alt="ridelogo" /></a>
          <div className="App-title">WebHub</div>
        </header>
        <div className="AllContent">
          <div className="leftVerticalBar">
            <div className="nav">
                <ul>
                  <li>
                    <Link  className={this.state.navHome} to='/'>
                      <div className="NavElement"><img src={homeIcon} className="home-icon" alt="homeicon" />Home</div>
                    </Link>
                  </li>
                  <li>
                    <Link className={this.state.navUpload} to='/Upload'>
                      <div className="NavElement"><img src={uploadIcon} className="upload-icon" alt="uploadicon" />Feed Management</div>
                    </Link>
                  </li>
                  <li>
                    <Link className={this.state.navNTD} to='/Reporting'>
                      <div className="NavElement"><img src={reportIcon} className="report-icon" alt="reporticon" />Reporting</div>
                    </Link>
                  </li>
                  <li>
                    <Link className={this.state.navViz} to='/MapViz'>
                      <div className="NavElement"><img src={vizIcon} className="viz-icon" alt="vizicon" />Map Visualization</div>
                    </Link>
                  </li>
                </ul>
            </div>
            
          </div>
          <div id="contentPanel" className="contentPanel">
          <Switch>
            <Route exact path='/'  render={()=>(<Home updateProc={this.home}/>)}/>
            <Route exact path='/Upload'  render={()=>(<Upload updateProc={this.upload}/>)}/>
            <Route exact path='/MapViz' render={()=>(<MyReport updateProc={this.mapViz}/>)}/>
            <Route exact path='/Reporting' render={()=>(<Report updateProc={this.Report}/>)}/>
          </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
