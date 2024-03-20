export const actionTypes = {
  GETPRODUCTS_LOADING: "GETPRODUCTS_LOADING",
  GETPRODUCTS_SUCCESS: "GETPRODUCTS_SUCCESS",
  GETPRODUCTS_ERROR: "GETPRODUCTS_ERROR",
};

export const getProducts = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GETPRODUCTS_LOADING,
    });
    dispatch({
      type: actionTypes.GETPRODUCTS_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.GETPRODUCTS_ERROR,
    });
  };
};
