export const actionTypes = {
  CREATECATEGORY_LOADING: "CREATECATEGORY_LOADING",
  CREATECATEGORY_SUCCESS: "CREATECATEGORY_SUCCESS",
  CREATECATEGORY_ERROR: "CREATECATEGORY_ERROR",
};

export const getCreateCategory = (response) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CREATECATEGORY_LOADING,
    });
    dispatch({
      type: actionTypes.CREATECATEGORY_SUCCESS,
      payload: response,
    });
    dispatch({
      type: actionTypes.CREATECATEGORY_ERROR,
    });
  };
};
