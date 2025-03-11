import React, {useState} from 'react';

import { Head } from "../../SimpleComps/Head.jsx";
import { WindowFactory } from "../../SimpleComps/WindowFactory.jsx";

// import LariatView from "./LariatView.jsx"

import "./LariatPage.css";


export default class LariatPage extends React.Component{
           constructor(props){
              super(props);
              // this.Ref = React.createRef();
              this.state = {
                isCalling: "hidden",
                Views: [],
              };
           }

  componentDidMount() {
    console.log("here")
  }

  render (){

    return  <>
      <Head />
      {/*<pre style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center", position: "fixed"}}></pre>*/}

      <h3 style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center"}}> That's not good.</h3>
      {/*<a href="/" style={{textAlign: "center", flex: 1}}>Go Home</a>*/}
      <div style={{flex: 1, textAlign: 'center'}}>
      <a href="javascript: void(0)" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}} onClick={this.getTheBoys}>Call for help</a>
      <p/>
      <a href="/" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}}>Go Home</a>
      </div>

      <div id="spawnedViews">

        {this.state.Views.map((view) => 
          <WindowFactory id={view} image={this.popViewMap.get(view)}/>
        )}

      </div>



    </>
  }
}