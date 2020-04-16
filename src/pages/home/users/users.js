import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import * as actions from "../../../redux/actions/index";
import store from "../../../redux/store";
import { Table } from 'react-bootstrap';
import './users.css';


export class Users extends Component {

  componentDidMount() {
    this.request();
  }

  handleDelete(id, e) {
    e.preventDefault();
   
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      Axios.delete('https://reqres.in/api/users/' + id).then(response => {
        const state = store.getState();
        const getUserList = state.userList;
        const result = getUserList.filter(user => user.id !== id);
        store.dispatch(actions.set(result));
      });
    }
  };

  request() {
    const { userList } = this.props;
    if (userList.length === 0) {
      Axios.get('https://reqres.in/api/users?page=1').then(response => {
        store.dispatch(actions.set(response.data.data));
        store.dispatch(actions.setTotal(response.data.total_pages));
        store.dispatch(actions.setNextPage(parseInt(response.data.page) + 1));
      });
    }
  };

  renderFarm(items = []) {
    return items.map((item, index) => {
      return (
        <tr>
          <td>    
          <div className="avatar">
            <img src={item.avatar} alt={item.first_name} />
          </div>
          </td>
          <td>{item.first_name} {item.last_name}</td>
          <td  className="action-right">
          <NavLink exact to={`/user/${item.id}/edit`} className="btn edit ">
              Edit
          </NavLink> 
          <button
              className="btn delete"
              onClick={e => this.handleDelete(item.id, e)}>
              Delete
          </button>
          </td>
        </tr>
      );
    });
  };
  render() {
    const { userList } = this.props;
    return (
      <>
        <Table  className="user-table" >
          <tbody>
            {this.renderFarm(userList)}

          </tbody>
        </Table>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  failure: state.failure,
  userList: state.userList,
  next_page: state.next_page,
  total_pages: state.total_pages
});

const mapDispatchToProps = dispatch => {
  const { get } = actions;
  return bindActionCreators(
    { get },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
