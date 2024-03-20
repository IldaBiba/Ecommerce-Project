export const actionTypes = {
  SIGNIN_LOADING: "SIGNIN_LOADING",
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNIN_ERROR: "SIGNIN_ERROR",
};

export const getSignIn = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGNIN_LOADING,
    });
    dispatch({
      type: actionTypes.SIGNIN_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.SIGNIN_ERROR,
    });
  };
};
