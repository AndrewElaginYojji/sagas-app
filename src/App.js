import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { AGE_UP, AGE_DOWN, SHOW_USERS, HIDE_USERS } from './store/actions';

class App extends Component {
  render() {
    const { age, users } = this.props;
    const userList = users ? users.map((user) => {
      return (
        <li key={user.id}>{user.name}</li>
      );
    }) : ''
    return (
      <div className="app">
        <div className="age-label">
          your age: <span>{age}</span>
        </div>
        <button onClick={this.props.onAgeUp}>Age UP</button>
        <button onClick={this.props.onAgeDown}>Age Down</button>
        <div style={{ marginTop: '25px' }}>
          <ul className="user-list">
          {userList}
          </ul>
          <button onClick={(this.props.showUsers)}>Show Users</button>
          <button onClick={this.props.hideUsers}>Hide Users</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    age: state.age,
    users: state.users
  };
};

const mapDispachToProps = dispatch => {
  return {
    onAgeUp: () => dispatch({ type: AGE_UP, value: 1 }),
    onAgeDown: () => dispatch({ type: AGE_DOWN, value: 1 }),
    showUsers: () => dispatch({ type: SHOW_USERS }),
    hideUsers: () => dispatch({ type: HIDE_USERS })
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
