import axios from 'axios';

import {
FETCH_USERS_PROFILE
  } from './type';
  const url = 'https://bislink.herokuapp.com/api/user/'

export function fetchUsersProfile() {
    return dispatch => axios.get(`${url}profile`)
      .then((response) => {
        const {
          user
        } = response.data;
        dispatch({
          type: FETCH_USERS_PROFILE,
          user
      });
       
      });
  }

