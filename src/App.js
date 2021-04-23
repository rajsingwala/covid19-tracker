import React from "react";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import India from "./India";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/india">
          <India />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
