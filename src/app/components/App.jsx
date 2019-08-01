import React from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import Home from "./Home/Home";
import BoardContainer from "./Board/BoardContainer";
import "./App.scss";

const App = () => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/b/:boardId" component={BoardContainer} />
        <Redirect to="/" />
      </Switch>
    );
};

export default withRouter(App);
