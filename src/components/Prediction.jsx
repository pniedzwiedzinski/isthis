import React, { Component } from "react";

import "./prediction.css";
import icon from "../times-solid.svg";

export default class Prediction extends Component {
  render() {
    return (
      <div className="result">
        <div className="close">
          <div className="circle" onClick={this.props.clear}>
            <img src={icon} alt="Close" />
          </div>
        </div>
        <div className="image-holder">
          <img src={this.props.img} className="input-image" alt="Your input" />
        </div>
        <div>
          {this.props.prediction[0][0] === 0 ? (
            <div className="prediction apple">Apple</div>
          ) : (
            <div className="prediction not-apple">Not apple</div>
          )}
        </div>
      </div>
    );
  }
}
