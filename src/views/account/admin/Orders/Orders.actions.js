export const actionTypes = {
  ORDERS_LOADING: "ORDERS_LOADING",
  ORDERS_SUCCESS: "ORDERS_SUCCESS",
  ORDERS_ERROR: "ORDERS_ERROR",
};

export const getOrders = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ORDERS_LOADING,
    });
    dispatch({
      type: actionTypes.ORDERS_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.ORDERS_ERROR,
    });
  };
};
