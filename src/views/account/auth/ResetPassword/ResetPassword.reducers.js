import { actionTypes } from "./SignIn.actions";

export const signIn = (
  state = {
    password: null,

    error: null,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.SIGNIN_LOADING:
      return state;
    case actionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        password: payload,
      };
    case actionTypes.SIGNIN_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
