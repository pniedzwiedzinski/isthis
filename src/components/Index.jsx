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
            <div style={{ flex: 1 }}>
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
            </div>
            <footer className="footer">
              <p>
                Made by&nbsp;
                <a href="https://prd-ev.github.io">PRDev</a>
              </p>
            </footer>
          </>
        ) : (
          <>
            <Prediction
              prediction={this.state.prediction}
              img={this.state.img}
              clear={this.clearInput}
            />
          </>
        )}
      </>
    );
  }
}
