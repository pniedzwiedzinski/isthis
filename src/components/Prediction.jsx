import React, { Component } from "react";

import "./prediction.css";

export default class Prediction extends Component {
  render() {
    return (
      <div className="result">
        <div className="image-holder">
          <img src={this.props.img} className="input-image" />
        </div>
        <div>
          {this.props.prediction[0] === "0" ? (
            <div className="prediction apple">Apple</div>
          ) : (
            <div className="prediction not-apple">Not apple</div>
          )}
        </div>
      </div>
    );
  }
}
