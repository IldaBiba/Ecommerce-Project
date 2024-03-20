export const actionTypes = {
  GETUSER_LOADING: "GETUSER_LOADING",
  GETUSER_SUCCESS: "GETUSER_SUCCESS",
  GETUSER_ERROR: "GETUSER_ERROR",
};

export const getUser = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GETUSER_LOADING,
    });
    dispatch({
      type: actionTypes.GETUSER_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.GETUSER_ERROR,
    });
  };
};
