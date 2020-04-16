import React, { Component } from "react";
import { connect } from "react-redux";
import DefaultLayout from "../../layouts/defaultLayout";
import UsersList from "./users";
import {NavLink} from "react-router-dom";

export class Home extends Component {
  
    render() {
        const title = "Home";
        return (
            <DefaultLayout title={title} private>
                <NavLink exact to='/add' className="btn add-user">Add User</NavLink>
                    <UsersList/>
            </DefaultLayout>
        );
    }
}

export default connect(null, null)(Home);
