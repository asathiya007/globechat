import React from 'react'; 
import {Route, Switch} from "react-router-dom";
import Register from "../../auth/Register/Register";
import Login from "../../auth/Login/Login";
import Alert from "../../layout/Alert/Alert";
import Dashboard from '../../dashboard/Dashboard/Dashboard';
import PrivateRoute from "../../routing/PrivateRoute/PrivateRoute";
import CreateProfile from "../../profile-forms/CreateProfile/CreateProfile";
import EditProfile from "../../profile-forms/EditProfile/EditProfile";
import Profiles from "../../profiles/Profiles/Profiles";
import Profile from "../../profile/Profile/Profile";
import Posts from "../../posts/Posts/Posts";
import Post from "../../post/Post/Post";
import NotFound from "../../layout/NotFound/NotFound";

const Routes = () => {
    return (
        <section className="container flexcenter top-space white-text">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/users" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/posts/:id" component={Post} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default Routes; 
