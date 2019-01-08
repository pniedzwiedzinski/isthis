import React, { Component } from "react";
import { Link } from "react-router-dom";

import SendImage from "./SendImage.jsx";
import Prediction from "./Prediction.jsx";
import TextLink from "@bit/prdev.prdev.components.text-link";

import icon from "../images/user.svg";

export default class Index extends Component {
  constructor(props) {
    super(props);
    let host = "https://isthisapple.pytatki-beta.pl";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      host = "http://127.0.0.1:5001";
    }
    this.state = {
      img: null,
      host: host,
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
    fetch(this.state.host + "/report/", {
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
            <Link to={"/login/"}>
              <img
                src={icon}
                style={{
                  position: "absolute",
                  right: 0,
                  margin: "30px",
                  display: "none"
                }}
              />
            </Link>
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
              <div className="source">
                <TextLink
                  href="https://github.com/prd-ev/isthis/"
                  color="#31616e"
                  bgColor="#ecebec"
                >
                  Check out source code &lt;/&gt;
                </TextLink>
              </div>
              <p>
                Made by&nbsp;
                <TextLink
                  href="https://prd-ev.github.io"
                  color="#31616e"
                  bgColor="#ecebec"
                >
                  PRDev
                </TextLink>
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
