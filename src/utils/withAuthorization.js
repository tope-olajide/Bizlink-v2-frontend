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
          localStorage.removeItem('token');
          window.location = '/auth';
        } 
        if (decoded.exp < new Date().getTime() / 1000 ) {
          localStorage.removeItem('token');
          window.location = '/auth';
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
