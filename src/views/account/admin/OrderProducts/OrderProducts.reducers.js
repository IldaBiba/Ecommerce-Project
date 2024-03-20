import { actionTypes } from "./OrderProducts.actions";

export const orderProductsAdmin = (
  state = {
    orderProducts: null,
    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.ORDERPRODUCTS_LOADING:
      return state;
    case actionTypes.ORDERPRODUCTS_SUCCESS:
      return {
        ...state,
        orderProducts: payload,
        loading: false,
      };
    case actionTypes.ORDERPRODUCTS_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
