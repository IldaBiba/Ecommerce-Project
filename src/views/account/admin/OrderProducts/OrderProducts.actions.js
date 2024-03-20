export const actionTypes = {
  ORDERPRODUCTS_LOADING: "OORDERPRODUCTS_LOADING",
  ORDERPRODUCTS_SUCCESS: "ORDERPRODUCTS_SUCCESS",
  ORDERPRODUCTS_ERROR: "ORDERPRODUCTS_ERROR",
};

export const getOrderProducts = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ORDERPRODUCTS_LOADING,
    });
    dispatch({
      type: actionTypes.ORDERPRODUCTS_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.ORDERPRODUCTS_ERROR,
    });
  };
};
