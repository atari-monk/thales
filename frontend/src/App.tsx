import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UserList from "./components/UserList";

function App() {
    return (
        <div className="App">
            <h1>My User Management App</h1>
            <UserList />
        </div>
    );
}

export default App;
