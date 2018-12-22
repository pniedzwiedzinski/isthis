import React, { Component } from "react";

export default class Prediction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Prediction: {this.props.prediction[0] == "0" ? "Apple" : "Not apple"}
      </div>
    );
  }
}
