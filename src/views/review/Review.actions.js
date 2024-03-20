export const actionTypes = {
  REVIEW_LOADING: "REVIEW_LOADING",
  REVIEW_SUCCESS: "REVIEW_SUCCESS",
  REVIEW_ERROR: "REVIEW_ERROR",
};

export const getReview = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.REVIEW_LOADING,
    });
    dispatch({
      type: actionTypes.REVIEW_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.REVIEW_ERROR,
    });
  };
};
