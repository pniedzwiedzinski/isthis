import React, { Component } from "react";
import SendImage from "./SendImage.jsx";
import Prediction from "./Prediction.jsx";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      prediction: null
    };
  }

  setPrediction = pred => {
    this.setState({
      prediction: pred
    });
  };

  clearInput = () => {
    this.setState({
      prediction: null
    });
  };

  render() {
    return (
      <>
        <div>Is this apple?</div>
        {this.state.prediction === null ? (
          <SendImage setPrediction={this.setPrediction} />
        ) : (
          <>
            <Prediction prediction={this.state.prediction} />
            <button onClick={this.clearInput}>X</button>
          </>
        )}
      </>
    );
  }
}
