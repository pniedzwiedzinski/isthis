import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from "./components/Index.jsx";
import AppleOrNot from "./components/AppleOrNot.jsx";
import Login from "./components/Login.jsx";

import "./index.css";

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <div className="container">
      <Route exact path="/" component={Index} />
      <Route path="/apple-or-not" component={AppleOrNot} />
      <Route path="/login" component={Login} />
    </div>
  </Router>,
  document.getElementById("root")
);
