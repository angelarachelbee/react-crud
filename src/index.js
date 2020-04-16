import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store/index";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import Home from './pages/home/home';
import Login from './pages/login/index';
import Add from './pages/add/index';
import SignUp from './pages/signup/index';
import NotFound from './pages/not-found/index';
import Logout from './pages/logout/index';
import Edit from './pages/edit/edit';

import 'bootstrap/dist/css/bootstrap.min.css';
import { PrivateRoute } from "./helper/privateRoute";
import "./index.css";

const routing = (
  <Provider store={store}>
    <Router>
      <div className={"container"}>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/home" exact component={Home} />
          <PrivateRoute path="/add" exact component={Add} />
          <PrivateRoute path="/user/:id/edit" exact component={Edit} />
          <Route exact path="/login" render={() => (localStorage.getItem("auth") ? (<Redirect to="/home" />) : (<Login />))} />
          <Route exact path="/signup" render={() => (localStorage.getItem("auth") ? (<Redirect to="/home" />) : (<SignUp />))} />
          <Route exact path="/logout" render={() => (localStorage.getItem("auth") ? (<Logout />) : (<Redirect to="/login" />))} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("layout"));
