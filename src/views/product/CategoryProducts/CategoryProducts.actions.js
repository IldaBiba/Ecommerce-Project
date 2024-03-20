export const actionTypes = {
  GETCATEGORYPRODUCTS_LOADING: "GETCATEGORYPRODUCTS_LOADING",
  GETCATEGORYPRODUCTS_SUCCESS: "GETCATEGORYPRODUCTS_SUCCESS",
  GETCATEGORYPRODUCTS_ERROR: "GETCATEGORYPRODUCTS_ERROR",
};

export const getCategoryProducts = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.GETCATEGORYPRODUCTS_LOADING,
    });
    dispatch({
      type: actionTypes.GETCATEGORYPRODUCTS_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.GETCATEGORYPRODUCTS_ERROR,
      payload: response,
    });
  };
};
