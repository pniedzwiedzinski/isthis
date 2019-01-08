import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <>
        <div>
          Login to continue:
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={event => {
              console.log("www");
              event.preventDefault();
            }}
            method="POST"
          >
            <input name="login" type="text" />
            <input name="password" type="password" />
            <input type="submit" />
          </form>
        </div>
      </>
    );
  }
}
