import React, { Component } from "react";
import { render } from "react-dom";
// import HomePage from "./HomePage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        {/*<HomePage />*/}
        <h1>Hello</h1>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
