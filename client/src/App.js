import React, {Fragment, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Video from "./components/layout/Video/Video";
import Landing from "./components/layout/Landing/Landing";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
// redux 
import {Provider} from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert/Alert";
import {loadUser} from "./actions/auth";
import Dashboard from './components/dashboard/Dashboard/Dashboard';
import PrivateRoute from "./components/routing/PrivateRoute/PrivateRoute"; 
import CreateProfile from "./components/profile-forms/CreateProfile/CreateProfile"; 
import EditProfile from "./components/profile-forms/EditProfile/EditProfile";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Video/>
          <Route exact path="/" component={Landing}/>
          <section className="container flexcenter top-space white-text">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider> 
  ); 
}

export default App;
