import { actionTypes } from "./GetUser.actions";

export const user = (
  state = {
    user: null,

    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.GETUSER_LOADING:
      return state;
    case actionTypes.GETUSER_SUCCESS:
      return {
        ...state,
        user: payload,

        loading: false,
      };
    case actionTypes.GETUSER_ERROR:
      return {
        ...state,

        error: payload,
      };
    default:
      return state;
  }
};
