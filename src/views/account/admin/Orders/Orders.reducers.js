import { actionTypes } from "./Orders.actions";

export const orderAdmin = (
  state = {
    order: null,
    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.ORDERS_LOADING:
      return state;
    case actionTypes.ORDERS_SUCCESS:
      return {
        ...state,
        order: payload,
        loading: false,
      };
    case actionTypes.ORDERS_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
