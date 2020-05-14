import axios from "axios";
import {
 FETCH_ALL_BUSINESSES, ADD_BUSINESS, SET_BUSINESS_DETAILS, FETCH_BUSINESS_REVIEWS, ADD_BUSINESS_REVIEW, MODIFY_BUSINESS
} from "../actions/type";
const url = "https://bislink.herokuapp.com/api/business";
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
export function fetchBusinessDetails(businessId) {
  return (dispatch) => { 
    return axios.get(`${url}/${businessId}`).then(response => {
      const { business, otherInfo } = response.data;
      const businessDetails = { business, otherInfo };
      dispatch({
        type: SET_BUSINESS_DETAILS,
        businessDetails
      });
    });
  }
}

export function fetchBusinessReviews(businessId) {
  return dispatch =>
    axios.get(`${url}/${businessId}/reviews`).then(response => {
      const { reviews } = response.data;
      dispatch({
        type: FETCH_BUSINESS_REVIEWS,
        reviews
      });
    });
}
export function addBusinessReviews(businessId, userReview) {
  return dispatch =>
    axios.post(`${url}/${businessId}/reviews`, userReview).then(response => {
      const { reviews } = response.data;
      dispatch({
        type: ADD_BUSINESS_REVIEW,
        reviews
      });
    });
}
export function modifyBusiness(businessData, businessId) {
  return dispatch =>
    axios.put(`${url}/${businessId}`, businessData).then(response => {
      const { business } = response.data;
      dispatch({
        type: MODIFY_BUSINESS,
        business
      });
    });
}

export function businessSearch(name, location, page, limit) {
  return dispatch =>
    axios
      .get(
        `${url}/search?name=${name}&location=${location}&page=${page}&limit=${limit}`
      )
      .then(response => {
        const { businesses, totalPages } = response.data;
        const pagedBusiness = { businesses, totalPages };
        dispatch({
          type: FETCH_ALL_BUSINESSES,
          pagedBusiness
        });
      });
}
export function sortBusinessBy(sort, page, limit) {
  return dispatch =>
    axios
      .get(`${url}/search?sort=${sort}&page=${page}&limit=${limit}`)
      .then(response => {
        const { businesses, totalPages } = response.data;
        const pagedBusiness = { businesses, totalPages };
        dispatch({
          type: FETCH_ALL_BUSINESSES,
          pagedBusiness
        });
      });
}