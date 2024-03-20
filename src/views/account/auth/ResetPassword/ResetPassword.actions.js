export const actionTypes = {
  RESETPASSWORD_LOADING: "RESETPASSWORD_LOADING",
  RESETPASSWORD_SUCCESS: "RESETPASSWORD_SUCCESS",
  RESETPASSWORD_ERROR: "RESETPASSWORD_ERROR",
};

export const getSignIn = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESETPASSWORD_LOADING,
    });
    dispatch({
      type: actionTypes.RESETPASSWORD_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.RESETPASSWORD_ERROR,
    });
  };
};
