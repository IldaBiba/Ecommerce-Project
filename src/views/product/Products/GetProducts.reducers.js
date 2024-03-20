import { actionTypes } from "./GetProducts.actions";

export const allProducts = (
  state = {
    products: null,
    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.GETPRODUCTS_LOADING:
      return state;
    case actionTypes.GETPRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case actionTypes.GETPRODUCTS_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
