import { actionTypes } from "./GetCategories.actions";

export const allCategories = (
  state = {
    categories: null,
    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.GETCATEGORIES_LOADING:
      return state;
    case actionTypes.GETCATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case actionTypes.GETCATEGORIES_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
