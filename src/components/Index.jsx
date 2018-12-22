import React, { Component } from "react";
import SendImage from "./SendImage.jsx";
import Prediction from "./Prediction.jsx";

import icon from "../times-solid.svg";

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

  setImg = img => {
    this.setState({
      img: img
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
        {this.state.prediction === null ? (
          <>
            <div>
              <h1 className="title">
                Is this
                <br />
                apple?
              </h1>
            </div>
            <SendImage
              setPrediction={this.setPrediction}
              setImg={this.setImg}
            />
          </>
        ) : (
          <>
            <div className="close" onClick={this.clearInput}>
              <img src={icon} />
            </div>
            <Prediction
              prediction={this.state.prediction}
              img={this.state.img}
            />
          </>
        )}
      </>
    );
  }
}
