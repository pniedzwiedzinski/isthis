import React, { Component } from "react";

export default class SendImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  send = event => {
    this.setState({ loading: true });
    var formData = new FormData();
    formData.append("image", event.target.files[0]);
    fetch("https://isthisapple.herokuapp.com/predict/", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(body => {
        this.props.setPrediction(body.data);
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
