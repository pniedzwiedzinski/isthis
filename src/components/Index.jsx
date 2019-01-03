import React, { Component } from "react";
import { Link } from "react-router-dom";
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

  sendReport = label => {
    var formData = new FormData();
    formData.append("label", label);
    formData.append("image", this.state.img[1]);
    fetch("http://pytatki-beta.pl:5001/report/", {
      mode: "no-cors",
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(body => {
        this.props.setPrediction(body.data);
      })
      .catch(error => {
        this.setImg(this.state.img);
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
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "35px",
                    marginBottom: 0
                  }}
                >
                  <Link
                    to="/apple-or-not/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="button-apple-or-not">
                      <span role="img" aria-label="apple">
                        🍎
                      </span>{" "}
                      or not
                    </div>
                  </Link>
                </div>
              </SendImage>
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
              img={this.state.img[0]}
              clear={this.clearInput}
              report={this.sendReport}
            />
          </>
        )}
      </>
    );
  }
}
