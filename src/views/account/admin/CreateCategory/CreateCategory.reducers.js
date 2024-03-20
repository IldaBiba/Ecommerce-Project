import { actionTypes } from "./CreateCategory.actions";

export const createCategory = (
  state = {
    category: null,
    error: null,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.CREATECATEGORY_LOADING:
      return state;
    case actionTypes.CREATECATEGORY_SUCCESS:
      return {
        ...state,
        category: payload,
      };
    case actionTypes.CREATECATEGORY_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
