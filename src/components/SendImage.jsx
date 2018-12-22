import React, { Component } from "react";

export default class SendImage extends Component {
  constructor(props) {
    super(props);
    let host = "https://isthisapple.herokuapp.com";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      host = "http://127.0.0.1:5000";
    }
    this.state = {
      loading: false,
      host: host
    };
  }

  send = event => {
    this.setState({ loading: true });
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
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          "Loading"
        ) : (
          <input type="file" accept="image/*" capture onChange={this.send} />
        )}
      </div>
    );
  }
}
