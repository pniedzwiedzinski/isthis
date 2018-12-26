import React, { Component } from "react";

import camera from "../camera-solid.svg";

export default class SendImage extends Component {
  constructor(props) {
    super(props);
    let host = "https://isthisapple.herokuapp.com";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      host = "http://127.0.0.1:5000";
    }
    this.state = {
      loading: false,
      host: host,
      error: null
    };
  }

  send = event => {
    this.setState({ loading: true });
    this.props.setImg([
      URL.createObjectURL(event.target.files[0]),
      event.target.files[0]
    ]);
    var formData = new FormData();
    formData.append("image", event.target.files[0]);
    fetch(this.state.host + "/predict/", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(body => {
        this.props.setPrediction(body.data);
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false, error: error });
      });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.loading ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
            <div>Loading...</div>
          </div>
        ) : (
          <>
            <input
              id="image"
              type="file"
              accept="image/*"
              capture
              onChange={this.send}
            />
            <label htmlFor="image">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <div className="button">
                  <img
                    src={camera}
                    className="camera-icon"
                    alt="Take a photo"
                  />
                </div>
              </div>
            </label>
            {this.state.error !== null ? (
              <div style={{ color: "red", marginTop: "10px", height: 0 }}>
                {String(this.state.error)}
              </div>
            ) : null}
            {this.props.children}
          </>
        )}
      </div>
    );
  }
}
