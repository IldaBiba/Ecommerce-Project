export const actionTypes = {
  GETBANNER_LOADING: "GETBANNER_LOADING",
  GETBANNER_SUCCESS: "GETBANNER_SUCCESS",
  GETBANNER_ERROR: "GETBANNER_ERROR",
};

export const getBanner = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GETBANNER_LOADING,
    });
    dispatch({
      type: actionTypes.GETBANNER_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.GETBANNER_ERROR,
    });
  };
};
