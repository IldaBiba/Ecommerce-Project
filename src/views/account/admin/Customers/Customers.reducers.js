import { actionTypes } from "./Customers.actions";

export const customer = (
  state = {
    customer: null,
    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.CUSTOMERS_LOADING:
      return state;
    case actionTypes.CUSTOMERS_SUCCESS:
      return {
        ...state,
        customer: payload,
        loading: false,
      };
    case actionTypes.CUSTOMERS_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
