import React, { Component } from "react";
import { render } from "react-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
// import HomePage from "./HomePage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <HomePage />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
