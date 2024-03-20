import { actionTypes } from "./SignIn.actions";

export const signIn = (
  state = {
    user: null,
    isSignedIn: false,
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
        user: payload,
        isSignedIn: true,
      };
    case actionTypes.SIGNIN_ERROR:
      return {
        ...state,
        isSignedIn: false,
        error: payload,
      };
    default:
      return state;
  }
};
