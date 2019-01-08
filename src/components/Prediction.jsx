import React, { Component } from "react";

import Report from "./Report.jsx";
import "./prediction.css";
import icon from "../images/times-solid.svg";

export default class Prediction extends Component {
  render() {
    return (
      <div className="result">
        <div className="circle-margin circle-margin-close">
          <div className="close" onClick={this.props.clear}>
            <img src={icon} alt="Close" />
          </div>
        </div>
        <div className="image-holder">
          <img src={this.props.img} className="input-image" alt="Your input" />
        </div>
        <div>
          <Report
            prediction={
              this.props.prediction[0][0] === 0 ? "apple" : "not-apple"
            }
            report={this.props.report}
          />
        </div>
      </div>
    );
  }
}
