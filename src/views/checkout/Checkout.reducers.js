import { actionTypes } from "./Checkout.actions";

export const order = (
  state = {
    order: null,
    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.CHECKOUT_LOADING:
      return state;
    case actionTypes.CHECKOUT_SUCCESS:
      return {
        ...state,
        order: payload,
      };
    case actionTypes.CHECKOUTP_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
