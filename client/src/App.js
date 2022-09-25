import React, { Component } from 'react';
import { w3cwebsocket } from "websocket";
import "./App.css";
import Messages from './Messages';
let client = w3cwebsocket("ws://localhost:5000")
class App extends Component {
    state = {
        userName: "",
        isLoggedIn: false,
        messages: [],
        textMsg: ""
    };

    componentDidMount() {
        client.onopen = () => {
            console.log("client running");

        }
        client.onmessage = (message)=>{
            this.setState({messages:JSON.parse(message.data)});
        };

    }
    sendMsg() {
        client.send(JSON.stringify({ name:this.state.userName,message:this.state.textMsg }));
        this.setState({textMsg:""});
    }
    render() {
        return (
            <div style={{"marginBottom":"3em"}}>
                <h1 className='heading'>Chat Room</h1>
                {
                    this.state.isLoggedIn === false ?
                        (<div className='Login'>
                            <input type="text" onChange={(e) => this.setState({ userName: e.target.value })} value={this.state.userName}></input>
                            <button onClick={() => this.setState({ isLoggedIn: true })}>Login</button>
                        </div>) :
                        (<div className='Container'>
                            <div className='Messages'>
                                {this.state.messages.map((m,index) => {
                                    return <Messages key={index} name={m.name} message={m.message} align={m.name===this.state.userName ? "right":"left"}></Messages>
                                })}
                            </div>
                            <div className='Send'>
                                <input type="text" onChange={(e) => this.setState({ textMsg: e.target.value })} value={this.state.textMsg}></input>
                                <button onClick={() => this.sendMsg()}>Send</button>
                            </div>
                        </div>)

                }
            </div>
        );
    }
}

export default App;