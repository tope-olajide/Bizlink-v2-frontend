import axios from "axios";
import {
 FETCH_ALL_BUSINESSES, ADD_BUSINESS,
} from "../actions/type";
const url = "http://127.0.0.1:5000/api/business";
const token = localStorage.getItem("token");

axios.interceptors.request.use(function (config) {
const token = localStorage.getItem("token");
  config.headers.authorization =  token;
  return config;
});

export function fetchBusinesses(page, limit) {
  return dispatch =>
    axios.get(`${url}?page=${page}&limit=${limit} `).then(response => {
      const { businesses, totalPages } = response.data;
      const pagedBusiness = { businesses, totalPages };
      dispatch({
        type: FETCH_ALL_BUSINESSES,
        pagedBusiness
      });
    });
}
export function addBusiness(businessData) {
  return dispatch =>
    axios.post(`${url}`, businessData).then(response => {
      const { business } = response.data;
      dispatch({
        type: ADD_BUSINESS,
        business
      });
    });
}