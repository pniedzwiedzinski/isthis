import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./apple-or-not.css";
import icon from "../times-solid.svg";

export default class AppleOrNot extends Component {
  constructor(props) {
    super(props);
    let host = "http://isthisapple.pytatki-beta.pl";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      host = "http://127.0.0.1:5001";
    }
    this.state = {
      img: null,
      host: host,
      loading: true
    };
  }

  componentDidMount() {
    this.getPhoto();
  }

  getPhoto = () => {
    fetch(this.state.host + "/report/")
      .then(res => res.json())
      .then(image => {
        this.setState({ img: image.data, loading: false });
      })
      .catch(error => console.log(error));
  };

  label = event => {
    fetch(this.state.host + "/label/", {
      mode: "no-cors",
      method: "POST",
      credentials: "include",
      body: event.target.getAttribute("label")
    }).then(this.setState({ img: null, loading: true }));
  };

  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(this.getPhoto(), 750);
    }
  }

  render() {
    return (
      <>
        <div className="header">
          <Link to="/">
            <img
              src={icon}
              alt="Close"
              style={{
                position: "absolute",
                left: "5vmin",
                height: "34px",
                cursor: "pointer"
              }}
            />
          </Link>
          <h1 style={{ fontSize: "inherit", padding: 0, margin: 0 }}>
            <span role="img" aria-label="apple">
              🍎
            </span>{" "}
            or not?
          </h1>
        </div>
        <div className="label-area">
          {!this.state.loading ? (
            <>
              <img
                src={"data:image/png;base64, " + this.state.img.slice(2, -1)}
                className="label-image"
              />
              <div className="choose">
                <div
                  className="apple choice"
                  label="apple"
                  onClick={this.label}
                >
                  Apple
                </div>
                <div
                  className="not-apple choice"
                  label="not-apple"
                  onClick={this.label}
                >
                  Not apple
                </div>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
              </div>
              <div>Loading...</div>
            </div>
          )}
        </div>
      </>
    );
  }
}
