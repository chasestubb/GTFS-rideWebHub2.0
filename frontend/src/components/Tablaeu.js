import React from 'react';

class Tablaeu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    var divElement = document.getElementById('viz1527626932858');                    
    var vizElement = divElement.getElementsByTagName('object')[0]; 
    vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';
    var scriptElement = document.createElement('script');                    
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    
    vizElement.parentNode.insertBefore(scriptElement, vizElement); 
  };

  componentWillUnmount() {
  
  };
  render(){
    return (
      <div className="TablaeuViz">
        <div className='tableauPlaceholder' id='viz1527626932858' >
          <noscript>
            <a href=''><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;rv&#47;rvtd_demo&#47;visual&#47;1_rss.png' style={{'border': 'none'}} /></a>
          </noscript>
          <object className='tableauViz'  style={{'display':'none'}}>
            <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> 
            <param name='embed_code_version' value='3' /> 
            <param name='path' value='views&#47;rvtd_demo&#47;visual?:embed=y&amp;:display_count=y' /> 
            <param name='toolbar' value='yes' />
            <param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;rv&#47;rvtd_demo&#47;visual&#47;1.png' /> 
            <param name='animate_transition' value='yes' />
            <param name='display_static_image' value='yes' />
            <param name='display_spinner' value='yes' />
            <param name='display_overlay' value='yes' />
            <param name='display_count' value='yes' />
          </object>
        </div>          
      </div>
    );
  }
};

export default Tablaeu;