import React, { Component } from "react";

export default class SendImage extends Component {
  constructor(props) {
    super(props);
  }

  send = event => {
    var formData = new FormData();
    formData.append("image", event.target.files[0]);
    fetch("predict/", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(body => this.props.setPrediction(body.data));
  };

  render() {
    return (
      <div>
        <input type="file" accept="image/*" capture onChange={this.send} />
      </div>
    );
  }
}
