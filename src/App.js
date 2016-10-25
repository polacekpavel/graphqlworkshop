import React, { Component } from "react";
import "./App.css";
import UserList from "./client/UserList";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={'./strvLogo.jpg'} className="App-logo" alt="logo"/>
                    <h2>Awesome app in GraphQL</h2>
                </div>
                <p className="App-intro">
                    <UserList />
                </p>
            </div>
        );
    }
}

export default App;
