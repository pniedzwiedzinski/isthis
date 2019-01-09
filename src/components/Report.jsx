import React, { Component } from "react";

import "./report.css";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLabel: null,
      report: false,
      canBeReported: true
    };
  }

  report = () => {
    return (
      <>
        <div className="report-question report-cell">What is this?</div>
        <div
          className="apple report-cell clickable"
          onClick={() => {
            this.props.report(1);
            this.setState({
              report: false,
              canBeReported: false,
              userLabel: "apple"
            });
          }}
        >
          Apple
        </div>
        <div
          className="not-apple report-cell clickable"
          onClick={() => {
            this.props.report(-1);
            this.setState({
              report: false,
              canBeReported: false,
              userLabel: "not-apple"
            });
          }}
        >
          Not apple
        </div>
        <div style={{ margin: "auto", textAlign: "center" }}>
          <span role="img" aria-label="Warning!">
            🚨
          </span>{" "}
          The image will be saved!
          <br /> Click 'X' to abort.
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
          {this.state.userLabel ? (
            <div className={`prediction ${this.state.userLabel}`}>
              {this.state.userLabel === "apple" ? "Apple" : "Not apple"}
            </div>
          ) : (
            <div className={`prediction ${this.props.prediction}`}>
              {this.props.prediction === "apple" ? "Apple" : "Not apple"}
            </div>
          )}
          {this.state.canBeReported ? (
            <div className="circle-margin circle-margin-report">
              <div
                className="report"
                onClick={() => this.setState({ report: true })}
              >
                <p style={{ margin: "auto", fontSize: "5vmin" }}>!</p>
              </div>
            </div>
          ) : (
            <div style={{ margin: "10px", textAlign: "center" }}>
              Thanks!{" "}
              <span role="img" aria-label="love">
                ❤️
              </span>
            </div>
          )}
        </>
      );
    }
  }
}
