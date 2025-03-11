// import Draggable from 'react-draggable';
// import { Resizable } from 'react-resizable';
import { Rnd } from "react-rnd";

// import React, {useState} from 'react';
import React, {useEffect,useState} from 'react';
// import ollama from 'ollama';
import "./CallBox.css"



export class CallBox extends React.Component{
	constructor(props){
		super(props);
		this.closeWindow = this.closeWindow.bind(this);
    this.state = {
    	term: "",
    	userMessagePointer: 0,
    	userMessages: [],
    	messages: [],
	    width: 480,
	    height: 360,
	    x: window.innerWidth/2-240,
	    y: window.innerHeight/2-360,
		};
    this.focusCall = React.createRef();
	}


	componentDidMount() {
		document.querySelector("#talk").style.maxHeight = "300px"
		document.querySelector(".textField").style.width = Math.round(.98*480-20).toString()+"px";
	}



	// startUpLlama = async (message) => {
	// 	const response = await ollama.chat({
	// 	  model: 'llama3.2',
	// 	  messages: [{role: 'user', content: `${message}`}],
	// 	})

	// 	const responseWritten = "@>"+ `${response.message.content}` + "\n";
	// 	var holdMessages = this.state.messages;

	// 	holdMessages.push({
	// 			role: 'system', 
	// 			content: `${response.message.content}`
	// 		})

	// 	const node = document.createElement('p');
	// 	node.innerHTML = responseWritten;

	// 	document.querySelector("#talk").append(node);
	// 	this.setState({
	// 			term: "",
	// 			// written: responseWritten,
	// 			messages: holdMessages,
	// 		})

	// 	this.scrollToBottom();
  //  };

  //  llamaEmbed = async () => {

	// 	document.querySelector(".userClass").classList.add("blink");
	//   document.querySelector(".textField").classList.add("blink");
	//   document.querySelector(".textField").disabled = true;

  //  	const toEmbed = this.state.term.split("debug:embed")[1].trimStart();
  //  	// console.log(toEmbed);

	// 	const response = await ollama.embed({
	// 	  model: 'llama3.2',
	// 	  input: toEmbed,
	// 	  options: {num_ctx: 4096},
	// 	});

	// 	this.setState({
	// 		term: ""});

  //  	console.log(response);

	// 	const node = document.createElement('p');
	// 	node.innerHTML = "$>" + `${this.state.term}`;
	// 	document.querySelector("#talk").append(node);

	// 	const responseNode = document.createElement('p');
	// 	responseNode.innerHTML = "@>" + `${response.embeddings}`;
	// 	document.querySelector("#talk").append(responseNode);

	//   document.querySelector(".textField").classList.remove("blink");
	// 	document.querySelector(".userClass").classList.remove("blink");
	//   document.querySelector(".textField").disabled = false;
	// 	// document.getElementById('talk').scrollTop = document.getElementById('talk').scrollHeight;
	// 	// document.getElementById("talk").focus();
	// 	this.focusCall.current.focus();
	// 	this.scrollToBottom();

  //  }


	llamaSpeak = async () => {

	  document.querySelector(".userClass").classList.add("blink");
	  document.querySelector(".textField").classList.add("blink");
	  document.querySelector(".textField").disabled = true;

		var holdMessages = this.state.messages
		
		holdMessages.push({
				role: 'user', 
				content: `${this.state.term}` 
			});

		this.setState({messages: holdMessages})

	// 	const response = await ollama.chat({
	// 	  model: 'llama3.2',
	// 	  messages: this.state.messages,
	// 	})


		// const responseWritten = this.state.written + "\n" + "$>" + `${this.state.term}` + "\n\n" 
	// 											 // + "@>"+ `${response.message.content}`+"\n";


	// 	holdMessages.push({
	// 			role: 'system', 
	// 			content: `${response.message.content}`
	// 		})

		this.setState({
				term: "",
				// written: responseWritten,
				messages: holdMessages,
			})


		const node = document.createElement('p');
		node.innerHTML = "$>" + `${this.state.term}`;
		document.querySelector("#talk").append(node);

	// 	const responseNode = document.createElement('p');
	// 	responseNode.innerHTML = "@>" + `${response.message.content}`;
	// 	document.querySelector("#talk").append(responseNode);

	  document.querySelector(".textField").classList.remove("blink");
		document.querySelector(".userClass").classList.remove("blink");
	  document.querySelector(".textField").disabled = false;
		// document.getElementById('talk').scrollTop = document.getElementById('talk').scrollHeight;
		// document.getElementById("talk").focus();
		this.focusCall.current.focus();
		this.scrollToBottom();
   }



	onKeyPressHandler = async (e) => {
		if (e.key === 'Enter') {
			const selectNode = document.querySelector("#talk");
			var pushUser = this.state.userMessages;
			pushUser.push(this.state.term);

			this.setState({userMessages: pushUser});
			this.setState({userMessagePointer: pushUser.length})

			if(this.state.term.startsWith("debug:")){
				this.debug();
				return;
			}

			switch(this.state.term.trim()){
			// case("clear"): this.setState({term: "", written: ""});
			case(":clear"): 
				this.setState({term: ""});	
				
				while (selectNode.firstChild) {
					selectNode.removeChild(selectNode.lastChild);
				}
				break;

			case(":reset"): 
				this.setState({term: ""});
				this.setState({messages: []})
				while (selectNode.firstChild) {
					selectNode.removeChild(selectNode.lastChild);
				}
				break;

			case(":purge"): 
				this.setState({term: ""});
				this.setState({messages: []})
				this.setState({userMessagePointer: 0, userMessages: [""]});
				break;

			case(":help"): 
				this.setState({term: ""});
				const responseNode = document.createElement('p');
				responseNode.innerHTML = "@>" + `Here are some commands you can execute:\n    :clear ––clears the terminal\n    :purge ––removes terminal history\n    :reset ––wipes messages from my memory\n    :help ––displays help\n    :quit ––closes this window`;
				selectNode.append(responseNode);
				this.scrollToBottom();
				break;

			case(":quit"): this.closeWindow();
				break;

			default: 
				this.llamaSpeak();
			}
		// } else if (e.key === 'Tab' && this.state.term.startsWith(":")){

		} else if (e.key === 'ArrowUp'){
			if (this.state.userMessagePointer-1>=0 &&  this.state.userMessages.length!=0){
				this.setState({
					term: this.state.userMessages[this.state.userMessagePointer-1]
					})
				this.setState({userMessagePointer: this.state.userMessagePointer-1})
			}

 		} else if (e.key === 'ArrowDown'){
			if (this.state.userMessagePointer+1<this.state.userMessages.length){
				this.setState({
					term: this.state.userMessages[this.state.userMessagePointer+1]
					})
				this.setState({userMessagePointer: this.state.userMessagePointer+1})
			}

			else{
				this.setState({term: ""})
			}
 	}

};


	debug(){
		const selectNode = document.querySelector("#talk");
		if(this.state.term.startsWith("debug:embed")){
			// this.llamaEmbed();
			return;
		} else {
				this.setState({term: ""});
				const responseNode1 = document.createElement('p');
				responseNode1.innerHTML = "@>" + `invalid debug command!!`;
				selectNode.append(responseNode1);

				const responseNode2 = document.createElement('p');
				responseNode2.innerHTML = "@>" + `debug executables:\n    debug:embed $X  ––embeds input text "$X" \n`
				selectNode.append(responseNode2);
				this.scrollToBottom();
		}
	}



  scrollToBottom() {
  	let scrollableDiv = document.getElementById('talk');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  }


  closeWindow(){
  	this.setState({term:"", width: 480, height: 360})
    this.props.handleCallChange("hidden");
  }

    render (){

  return <>



		<Rnd
			className="content"
			cancel="callBoxTitleCloseBox"
			dragHandleClassName="headerTitle"
			minWidth={340}
			minHeight={200}
		  size={{ width: this.state.width,  height: this.state.height }}
		  position={{ x: this.state.x, y: this.state.y }}
		  onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
		  onResizeStop={(e, direction, ref, delta, position) => {

				document.getElementById("talk").style.maxHeight = 
					(parseInt(ref.style.height.split("px")[0])-26-20).toString()+"px";
				document.querySelector(".textField").style.width = Math.round(.98*ref.style.width.split("px")[0]-20).toString()+"px";


			    this.setState({
		      width: ref.style.width,
		      height: ref.style.height,
		      ...position,
		    });
		  }}
		>

	    <div id="callBoxTitle" className="headerTitle">
	      <div className="topTitleLine"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="titleLines"></div>
	      <div className="bottomTitleLines"></div>
	      <div id="callBoxTitleHandle" className="callTitle"> @&gt; </div>
	      <div id="callBoxTitleCloseBox" className="control-box close-box" onClick={this.closeWindow}>
	      <a id="callBoxTitleCloseInner" className="control-box-inner" ></a>
	      </div>
	    </div >
	    {/*<div id="talk" style={{color:"#666"}}>*/}
	    <div id="talk">
	    </div>
	    	{/*<pre id="talk">{this.state.written}</pre>	*/}
	    	{/*<pre id="talk" style={{maxHeight: this.state.height-26-19}}>{this.state.written}</pre>*/}
	    <div>
	    	{/*<p className="blink">~@</p>*/}
	    <section>
	    <p className="command__user"><span className={`userClass`}>$&gt;
	    <input
	    		className={`textField`}
	    		type="text"
	    		value={this.state.term}
	    		ref={this.focusCall}
	    		onChange={e=>this.setState({term: e.target.value})}
          autoComplete="off"
          onKeyDown={this.onKeyPressHandler}
          autoFocus="autofocus"/>
      </span></p>
      </section>
	  </div>
	  </Rnd>
	  </>
  }
}