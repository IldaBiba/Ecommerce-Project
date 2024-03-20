import { actionTypes } from "./Review.actions";

export const review = (
  state = {
    review: null,
    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.REVIEW_LOADING:
      return state;
    case actionTypes.REVIEW_SUCCESS:
      return {
        ...state,
        review: payload,
        loading: false,
      };
    case actionTypes.REVIEW_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
