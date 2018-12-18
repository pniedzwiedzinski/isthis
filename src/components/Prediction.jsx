import React, { Component } from "react";

export default class Prediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      prediction: null
    };
  }

  render() {
    return <div>Prediction: {this.state.prediction}</div>;
  }
}
