import axios from 'axios';

import {
FETCH_USERS_PROFILE
  } from './type';
  import baseUrl from '../utils/baseUrl'
  
  const url = `${baseUrl}/api/user/`

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

