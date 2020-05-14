import axios from "axios";

import {
  FETCH_GALLERIES,
  DEFAULT_BUSINESS_IMAGE,
  DELETE_PICTURE
} from "./type";
const url = "https://bislink.herokuapp.com/api/business";

export function setDefaultImage(businessId, businessImageUrl) {
  return dispatch =>
    axios
      .put(
        `${url}/${businessId}/gallery?businessImageUrl=${businessImageUrl}`
      )
      .then(response => {
        const { defaultBusinessImage } = response.data;
        dispatch({
          type: DEFAULT_BUSINESS_IMAGE,
          defaultBusinessImage
        });
      });
}
export function fetchPictures(businessId) {
  return dispatch =>
    axios.get(`${url}/${businessId}/gallery`).then(response => {
      const { businessPictures } = response.data;
      dispatch({
        type: FETCH_GALLERIES,
        businessPictures
      });
    });
}
export function deletePicture(businessImageId) {
  return dispatch =>
    axios
      .delete(
        `${url}/${businessImageId}/gallery`
      )
      .then(response => {
        const { businessPictures } = response.data;
        dispatch({
          type: DELETE_PICTURE,
          businessPictures
        });
      });
}
