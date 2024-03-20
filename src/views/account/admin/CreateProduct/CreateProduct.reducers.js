import { actionTypes } from "./CreateProduct.actions";

export const createProduct = (
  state = {
    category: null,
    error: null,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.CREATEPRODUCT_LOADING:
      return state;
    case actionTypes.CREATEPRODUCT_SUCCESS:
      return {
        ...state,
        category: payload,
      };
    case actionTypes.CREATEPRODUCT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
