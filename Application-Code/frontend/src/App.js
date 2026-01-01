import React from "react";
import Tasks from "./Tasks";
import "./App.css";

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <h1>My To-Do List</h1>
                </header>
                <div className="main-content">
                    <Tasks />
                </div>
            </div>
        );
    }
}

export default App;

