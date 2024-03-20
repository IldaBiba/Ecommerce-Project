export const actionTypes = {
  CHECKOUT_LOADING: "CHECKOUT_LOADING",
  CHECKOUT_SUCCESS: "CHECKOUT_SUCCESS",
  CHECKOUT_ERROR: "CHECKOUT_ERROR",
};

export const getCheckout = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECKOUT_LOADING,
    });
    dispatch({
      type: actionTypes.CHECKOUT_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.CHECKOUT_ERROR,
    });
  };
};
