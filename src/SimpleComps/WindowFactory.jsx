import { Rnd } from "react-rnd";
import React, {useEffect,useState} from 'react';
import "./WindowFactory.css"


export class WindowFactory extends React.Component{
	constructor(props){
		super(props);
		this.closeWindow = this.closeWindow.bind(this);
    this.state = {
	    width: 640,
	    height: 480,
	    x: window.innerWidth/2-640,
	    y: -480*1.45,
		};
	}


	componentDidMount() {
	}



  // closeWindow(){
  // 	this.setState({term:"", width: 480, height: 360})
  //   this.props.handleCallChange("hidden");
  // }
  closeWindow(){
  	this.setState({width: 640, height: 480})
  	document.getElementById(this.props.id).remove();
  }
    render (){

  return <>



    <Rnd
      id={this.props.id}
			className="content"
			cancel="BoxTitleCloseBox"
			dragHandleClassName="headerTitle"
			minWidth={340}
			minHeight={200}
		  size={{ width: this.state.width,  height: this.state.height }}
		  position={{ x: this.state.x, y: this.state.y }}
		  onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
		  onResizeStop={(e, direction, ref, delta, position) => {

			    this.setState({
		      width: ref.style.width,
		      height: ref.style.height,
		      ...position,
		    });
		  }}
      onClick={() => {
      const divs = document.querySelectorAll(".content");
      divs.forEach(div => { 
        div.style.zIndex = div.style.zIndex > 1 ? div.style.zIndex - 2 : 0;
      })
      console.log(this.props.id)
      document.getElementById(this.props.id).style.zIndex=2
    }}    
		>

    <div id="BoxTitle" className="headerTitle">
      <div className="topTitleLine"></div>
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div className="titleLines"></div>
      <div className="bottomTitleLines"></div>
      <div id="BoxTitleHandle" className="callTitle">Vector Search</div>
      <div id="BoxTitleCloseBox" className="control-box close-box" >
      <a id="BoxTitleCloseInner" className="control-box-inner" onClick={this.closeWindow}></a>
      </div>
    </div>

	    <div>
	    <section>
	    {/*{self.children}*/}
      </section>
	  </div>
	  </Rnd>
	  </>
  }
}