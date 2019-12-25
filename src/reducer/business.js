import {
    FETCH_ALL_BUSINESSES,ADD_BUSINESS,SET_BUSINESS_DETAILS,UPVOTE_BUSINESS,
    DOWNVOTE_BUSINESS, FOLLOW_USER, UNFOLLOW_USER, ADD_TO_FAVOURITE,REMOVE_FROM_FAVOURITE
  } from '../actions/type'
  const initialState = {
    allBusinesses: {},
    businessDetails: {}
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
          case SET_BUSINESS_DETAILS:
      return {
        ...state, businessDetails: action.businessDetails,
      };
    case UPVOTE_BUSINESS:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          business: {
            ...state.businessDetails.business,
            upvotes: action.business.upvotes,
            downvotes: action.business.downvotes
          }
        }
      };
    case DOWNVOTE_BUSINESS:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          business: {
            ...state.businessDetails.business,
            upvotes: action.business.upvotes,
            downvotes: action.business.downvotes
          }
        }
      };
    case FOLLOW_USER:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          otherInfo: {
            ...state.businessDetails.otherInfo,
            isFollowing: action.isFollowing,
            followersCount: state.businessDetails.otherInfo.followersCount + 1
          }
        }
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          otherInfo: {
            ...state.businessDetails.otherInfo,
            isFollowing: action.isFollowing,
            followersCount: state.businessDetails.otherInfo.followersCount - 1
          }
        }
      };
    case ADD_TO_FAVOURITE:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          otherInfo: {
            ...state.businessDetails.otherInfo,
            isUserFavourite: action.isFavourite
          }
        }
      };
    case REMOVE_FROM_FAVOURITE:
      return {
        ...state,
        businessDetails: {
          ...state.businessDetails,
          otherInfo: {
            ...state.businessDetails.otherInfo,
            isUserFavourite: action.isFavourite
          }
        }
      };
        default:
            return state;
        }
      }