import { actionTypes } from "./SignUp.actions";

export const signUp = (
  state = {
    user: null,
    isSignedUp: false,
    error: null,
    loading: true,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.SIGNUP_LOADING:
      return state;
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload,
        isSignedUp: true,
      };
    case actionTypes.SIGNUP_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
