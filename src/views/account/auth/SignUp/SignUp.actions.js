export const actionTypes = {
  SIGNUP_LOADING: "SIGNUP_LOADING",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_ERROR: "SIGNUP_ERROR",
};

export const getSignUp = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGNUP_LOADING,
    });
    dispatch({
      type: actionTypes.SIGNUP_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.SIGNUP_ERROR,
    });
  };
};
