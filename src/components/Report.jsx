import React, { Component } from "react";

import "./report.css";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: false
    };
  }

  report = () => {
    return (
      <>
        <div className="report-question report-cell">What is this?</div>
        <div
          className="apple report-cell clickable"
          onClick={() => this.props.report("apple")}
        >
          Apple
        </div>
        <div
          className="not-apple report-cell clickable"
          onClick={() => this.props.report("not-apple")}
        >
          Not apple
        </div>
      </>
    );
  };

  render() {
    if (this.state.report) {
      return this.report();
    } else {
      return (
        <>
          <div className={`prediction ${this.props.prediction}`}>
            {this.props.prediction === "apple" ? "Apple" : "Not apple"}
          </div>
          <div className="circle-margin circle-margin-report">
            <div
              className="report"
              onClick={() => this.setState({ report: true })}
            >
              <p style={{ margin: "auto", fontSize: "5vmin" }}>!</p>
            </div>
          </div>
        </>
      );
    }
  }
}
