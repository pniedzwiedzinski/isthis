import React, { Component } from "react";

export default class Prediction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Prediction:{" "}
        {this.props.prediction.apple > this.props.prediction.not_apple
          ? "Apple"
          : "Not apple"}
      </div>
    );
  }
}
