import React, { Component } from 'react';
import jsonwebtoken from 'jsonwebtoken';
import { connect } from 'react-redux';
import { signOut } from '../actions/authActions'

export default (ProtectedRoute) => {
class AuthenticateUser extends Component {
    componentDidMount() {
      const token = localStorage.getItem('token');
const decoded = jsonwebtoken.decode(token);
        
        if (!token || !decoded) {
          this.props.signOut();
        } 
        if (decoded.exp < new Date().getTime() / 1000 ) {
          this.props.signOut();
        }
      }
      render() {
        return (
          <ProtectedRoute {...this.props} />
        );
      }
}
return connect(null, { signOut })(AuthenticateUser);
}
