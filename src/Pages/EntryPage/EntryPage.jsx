import React, {useState} from 'react';

import { Head } from "../../SimpleComps/Head.jsx";
import { WindowFactory } from "../../SimpleComps/WindowFactory.jsx";
import { CallBox } from "../../CallBox/CallBox.jsx";

import "./EntryPage.css";

import { Plasma } from "../../assets/plasma.js";



export default class EntryPage extends React.Component{
           constructor(props){
              super(props);
              // this.Ref = React.createRef();
              this.state = {
                isCalling: "hidden",
                Views: [],
              };
              this.popViewMap = new Map();
              this.relayOneLevelUp = this.relayOneLevelUp.bind(this);
              this.handleCallChange = this.handleCallChange.bind(this);
              this.getTheBoys = this.getTheBoys.bind(this);
           }

  componentDidMount() {
      var plasmaBox = new Plasma(document.getElementById('plasmaArea'),Math.round(window.innerWidth/9.56)+1,Math.round(window.innerHeight/20.91)+1);
  }


  componentDidUpdate(prevProps, prevState){
    if(prevState.Views!=this.state.Views){
      console.log('look')
      this.setState({Views: this.state.Views})

    }
  }


  getTheBoys(){
    this.setState({isCalling : "visible"})  
    setTimeout(document.querySelector(".textField").focus(), 200);

    // const fetchPromise = fetch(`http://localhost:8080/api/talk`);
    // fetchPromise.then(response => {
    //           return response.json();
    //               }).then(entries => {
    //                 document.getElementById("talk").innerHTML = entries;
    //                 // console.log(entries);
    //               });
    console.log('meow!')

  }


  // if HEAD transmits, handle it and then react accordingly. 

  // 

  relayOneLevelUp(reply){
    console.log(reply)
    switch(reply){
      case "New Window":
        // var recordViews = [...this.state.Views];
        const x = crypto.randomUUID()
        this.state.Views.push(x);
        // this.setState({Views: this.state.Views})

        // this.state.popViews.push((x));
        this.popViewMap.set(x)
        this.setState({Views: this.state.Views});        
        break;
      default:
        console.log("[WARN] unrecognized debug choice ")
    }

  }


    handleCallChange(){
    if(this.state.isCalling=="hidden"){
      this.setState({isCalling: "visible"})
    } else{
    this.setState({isCalling: "hidden"})
    }  
  }

  // closeWindow(){
  //   console.log('here')
  //   this.setState({visCallBox: "hidden"});
  // }


  render (){

    return  <>

      <Head relayOneLevelUp={this.relayOneLevelUp} />


      <pre style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center", position: "fixed"}}></pre>
      <div align="center"><pre id="plasmaArea" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}}>ASCIIPlasma</pre></div>

      <h3 style={{backgroundColor: "transparent", fontSize: "12px", color:"#666", textAlign: "center"}}> That's not good.</h3>
      {/*<a href="/" style={{textAlign: "center", flex: 1}}>Go Home</a>*/}

      <div style={{flex: 1, textAlign: 'center'}}>
      <a href="javascript: void(0)" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}} onClick={this.getTheBoys}>Call for help</a>
      <p/>
      <a href="/" style={{backgroundColor: "transparent", fontSize: "12px", color:"#666"}}>Go Home</a>
      </div>

      <div id="spawnedViews">
        {this.state.Views.map((view) => 
          <WindowFactory id={view} handleCallChange={this.handleCallChange}/>
        )}
      </div>

    </>
  }
}