import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./apple-or-not.css";
import icon from "../times-solid.svg";

export default class AppleOrNot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="header">
          <Link to="/">
            <img
              src={icon}
              alt="Close"
              style={{
                position: "absolute",
                left: "5vmin",
                height: "34px",
                cursor: "pointer"
              }}
            />
          </Link>
          <h1 style={{ fontSize: "inherit", padding: 0, margin: 0 }}>
            <span role="img" aria-label="apple">
              🍎
            </span>{" "}
            or not?
          </h1>
        </div>
        <div className="label-area">
          <h1>W.I.P.</h1>
        </div>
      </>
    );
  }
}
