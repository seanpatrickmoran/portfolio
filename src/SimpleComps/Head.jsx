import { useNavigate } from "react-router";
import * as React from "react";
// import { MSDropDown } from "./MSDropDown.jsx";
import { ProjComboBox } from "./ProjComboBox.jsx";
import { MenuDD } from "./MenuDD.jsx";
import { AboutMe } from "./AboutMe.jsx"
// import { DownshiftThree } from "./DS3.jsx";
// import { MultiDownshift, MultiDropdownApp,  ArrowIcon } from "./example.jsx";
// import { ipcRenderer } from 'electron';

export class Head extends React.Component{
  constructor(props){
    super(props);
    this.relayWindowFactory = this.relayWindowFactory.bind(this)
    this.relayRouting = this.relayRouting.bind(this)
    this.items = ["all","ball"];
    this.state = {
      favicon: "", 
      lightModeBool: window.matchMedia('(prefers-color-scheme: light)').matches, //true to lightmode, false to darkmode;
    }
  }

  componentDidMount(){
    console.log('hey!')
    const faviconMode = this.state.lightModeBool ? "/colloidal.svg" : "/cyclops.svg";
    console.log(faviconMode)
    this.setState({favicon: faviconMode, lightModeBool: window.matchMedia('(prefers-color-scheme: light)').matches});
  }


  componentDidUpdate(prevProp,prevState){
  }


  relayWindowFactory(response){
    this.props.relayOneLevelUp(response);
  }


  relayRouting(response){
    console.log(response)

    // handle debug
    switch(response){
      case "New Window":
        break;
      case "Upload":
        break;
      case "Close":
        break;
      case "Download":
        break;
      default:
    } 
  }


  navToOne = () => navigate('/one');



  render(){
    return (
      <>
        <link id="favicon" rel="icon" type="image/svg+xml" href={this.state.favicon} />

        <div  className="row-container" 
              style={{
                  marginTop: 38, 
                  marginBottom: 8, 
                  marginLeft: Math.round(window.innerWidth/8.56)+1,
                  marginRight: 20}}>

        {/*<MSDropDown tag="Input Source" choices={["User Upload", "Clipboard"]} handleChange={this.toggleSearchInput}/>*/}

          <MenuDD         
                          id="main-menu"
                          toggleSearchInput={this.relayWindowFactory}
                          items = {self.items}
                          style={{position: "fixed"}}/>

          <ProjComboBox   id="project-menu" 
                          tag={"project"} 
                          choices={["All"]}
                          handleChange={this.relayRouting}
                          style={{position: "fixed"}}/>

          <AboutMe        id="about-menu" 
                          tag={"about"} 
                          choices={["All"]}
                          handleChange={this.relayRouting}
                          style={{position: "fixed"}}/>


        </div>

  {/*     <nav className="row-container">
        <button className="command_button" id="backBtn" onClick={navToMain}> MAIN </button>
        <button className="command_button" id="viewToQueryBtn" onClick={navToQuery}> QUERY </button>
        <button className="command_button" id="viewToInspectBtn" onClick={navToInspect}> INSPECT </button>
        <button className="command_button" id="viewToPairsBtn" onClick={navToPairs}> PAIRS </button>
        </nav>*/}
      </>
    )
  }
}
