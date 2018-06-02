import React from 'react';
import './tables.css';

class Tables extends React.Component {
  constructor(props){
    super(props);
    this.updateHandler  =   this.props.updateProc;
    this.state = {
      
    };
  }

  componentDidMount() {
    this.updateHandler();
  };

  componentWillUnmount() {
  
  };
  render(){
    return (
      <div className="table">
        <h1>Reporting</h1>
      </div>
    );
  }
};

export default Tables;