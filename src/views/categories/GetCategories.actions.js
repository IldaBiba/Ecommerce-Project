export const actionTypes = {
  GETCATEGORIES_LOADING: "GETCATEGORIES_LOADING",
  GETCATEGORIES_SUCCESS: "GETCATEGORIES_SUCCESS",
  GETCATEGORIES_ERROR: "GETCATEGORIES_ERROR",
};

export const getCategories = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GETCATEGORIES_LOADING,
    });
    dispatch({
      type: actionTypes.GETCATEGORIES_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.GETCATEGORIES_ERROR,
    });
  };
};
