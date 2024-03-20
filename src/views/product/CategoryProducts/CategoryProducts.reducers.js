import { actionTypes } from "./CategoryProducts.actions";

export const allCategoryProducts = (
  state = {
    products: null,
    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.GETCATEGORYPRODUCTS_LOADING:
      return state;
    case actionTypes.GETCATEGORYPRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case actionTypes.GETCATEGORYPRODUCTS_ERROR:
      return {
        ...state,
        products: null,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
