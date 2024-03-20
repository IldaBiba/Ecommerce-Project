export const actionTypes = {
  GETPRODUCT_LOADING: "GETPRODUCT_LOADING",
  GETPRODUCT_SUCCESS: "GETPRODUCT_SUCCESS",
  GETPRODUCT_ERROR: "GETPRODUCT_ERROR",
};

export const getProduct = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GETPRODUCT_LOADING,
    });
    dispatch({
      type: actionTypes.GETPRODUCT_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.GETPRODUCT_ERROR,
    });
  };
};
