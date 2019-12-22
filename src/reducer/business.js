import {
    FETCH_ALL_BUSINESSES,ADD_BUSINESS
  } from '../actions/type'
  const initialState = {
    allBusinesses: {}
}
export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ALL_BUSINESSES:
        return {
          ...state,
          allBusinesses: action.pagedBusiness
        };
        case ADD_BUSINESS:
          return {
            ...state,
            allBusinesses: {
              ...state.allBusinesses, allBusinesses: action.pagedBusiness
            },
          };
        default:
            return state;
        }
      }