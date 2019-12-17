import {
    FETCH_ALL_BUSINESSES,
  } from '../actions/type'
  const initialState = {
    allBusinesses: {
    }
}
export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_BUSINESSES:
        return {
          ...state,
          allBusinesses: action.pagedBusiness
        };
        default:
            return state;
        }
      }