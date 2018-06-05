import React from 'react';
import './UploadPanel.css';

class Upload extends React.Component {
  constructor(props){
    super(props);
    this.updateHandler  =   this.props.updateProc;
    this.state = {
      username:null,
      password:null,
      error:"hide"
    };
  }

  updateUser = (evt) => {
    this.setState({
      username: evt.target.value
    });
  }

  updatePassword = (evt) => {
    this.setState({
      password: evt.target.value
    });
  }

  upload = ()=>{
    //check credentials
    this.setState({
      error: "hide"
    });
    setTimeout(() => {
      if(this.state.username === null && this.state.password ===null){
        this.setState({
          error: "error"
        });
      }
      else{
        var url = '/checkUser/'+this.state.username+'/password/'+this.state.password+'/';
        fetch(url)
        .then(res => res.json())
        .then((mycount) => {
          if(mycount.valid === true){
            //alert("received true")
            window.open("http://localhost:8080/?User="+this.state.username+"#/",'_self');
          }
          else{
            //alert("received false")
            this.setState({
              error: "error"
            });
          }
        });
      }
    }, 60);
  }

  componentDidMount() {
    this.updateHandler();
  };

  componentWillUnmount() {
  
  };
  render(){
    return (
      <div className="Upload">
      <p>
        If you have not validated your feed, please use the validation tool found <a target="#" href="https://github.com/ODOT-PTS/transitfeed-ride">Here </a>before continuing.
      </p>
      <div className="Login">
        <div className="leftContent">
          <div className="title" >LOGIN </div>
          <div className="entries">
            <div className="username">UserName<br/><input  onChange={this.updateUser} id="Username" placeholder="example123"/>
            </div>
            <div className="password">Password<br/><input type="password" onChange={this.updatePassword} id="Password" placeholder="********"/>
            </div>
            <div className={this.state.error}> Incorrect username/password</div>
          </div>
        </div>
        <button className="goButton" onClick={this.upload} value="Test">Submit</button>  
      </div>
      </div>
    );
  }
};

export default Upload;