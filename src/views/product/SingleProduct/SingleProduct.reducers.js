import { actionTypes } from "./SingleProduct.actions";

export const singleProduct = (
  state = {
    product: null,
    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.GETPRODUCT_LOADING:
      return state;
    case actionTypes.GETPRODUCT_SUCCESS:
      return {
        ...state,
        product: payload,
        loading: false,
      };
    case actionTypes.GETPRODUCT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
