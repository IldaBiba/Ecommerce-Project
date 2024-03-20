export const actionTypes = {
  CUSTOMERS_LOADING: "CUSTOMERS_LOADING",
  CUSTOMERS_SUCCESS: "CUSTOMERS_SUCCESS",
  CUSTOMERS_ERROR: "CUSTOMERS_ERROR",
};

export const getCustomers = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CUSTOMERS_LOADING,
    });
    dispatch({
      type: actionTypes.CUSTOMERS_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.CUSTOMERS_ERROR,
    });
  };
};
