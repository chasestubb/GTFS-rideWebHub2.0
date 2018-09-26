import React from 'react';
import tableau from 'tableau-api';

class Reports extends React.Component {
  constructor(props){
    super(props);
    this.updateHandler  =   this.props.updateProc;
    this.state = {
    };
  }
  initTableau() {
    const vizUrl =
        "https://public.tableau.com/views/rvtd_demo/table";

    const options = {
        hideTabs: false,
        width: "83vw",
        height: "90vh",
        hideToolbar: true,
        onFirstInteractive: () => {
        }
    };
    var container = document.getElementById('myViz');
    let viz = new window.tableau.Viz(container, vizUrl, options);
  };
  componentDidMount() {
    this.updateHandler();
    this.initTableau();
  };
  componentWillUnmount() {
  
  };
  render(){
    return (
      <div className="TablaeuViz">
        <div id='myViz'>
        </div>          
      </div>
    );
  }
};

export default Reports;