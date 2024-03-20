export const actionTypes = {
  CREATEPRODUCT_LOADING: "CREATEPRODUCT_LOADING",
  CREATEPRODUCT_SUCCESS: "CREATEPRODUCT_SUCCESS",
  CREATEPRODUCT_ERROR: "CREATEPRODUCT_ERROR",
};

export const getCreateProduct = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CREATEPRODUCT_LOADING,
    });
    dispatch({
      type: actionTypes.CREATEPRODUCT_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.CREATEPRODUCT_ERROR,
    });
  };
};
