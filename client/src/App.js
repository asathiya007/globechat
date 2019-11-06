import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Video from "./components/layout/Video/Video";
import Landing from "./components/layout/Landing/Landing";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar/>
        <Video/>
        <Route exact path="/" component={Landing}/>
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  ); 
}

export default App;
