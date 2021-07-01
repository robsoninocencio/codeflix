import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import Button from "@material-ui/core/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Button variant="contained" color="primary">
            Botão 1
          </Button>
          <Button variant="contained" color="secondary">
            Botão 2
          </Button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
