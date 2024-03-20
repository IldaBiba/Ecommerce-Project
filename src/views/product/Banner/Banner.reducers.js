import { actionTypes } from "./Banner.actions";

export const banner = (
  state = {
    banner: null,
    error: null,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.GETBANNER_LOADING:
      return state;
    case actionTypes.GETBANNER_SUCCESS:
      return {
        ...state,
        banner: payload,
      };
    case actionTypes.GETBANNERT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
