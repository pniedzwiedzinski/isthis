import React, { Component } from "react";

export default class SendImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: null
    };
  }

  send = event => {
    var formData = new FormData();
    formData.append("image", event.target.files[0]);
    fetch("predict/", {
      method: "POST",
      body: formData
    });
  };

  render() {
    return (
      <div>
        <input type="file" accept="image/*" capture onChange={this.send} />
      </div>
    );
  }
}
