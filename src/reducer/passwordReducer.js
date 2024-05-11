import {
  passwordNullError,
  passwordNotSameError,
  passwordNotMatchError,
} from "../utils/errorMessage";

export const passwordInitialMessage = { passwordMessage: "" };

//패스워드 hyperText
export function passwordMessageReducer(_, action) {
  switch (action.type) {
    case "passwordNull":
      return { passwordMessage: passwordNullError };
    case "passwordNotSame":
      return { passwordMessage: passwordNotSameError };
    case "passwordNotMatch":
      return { passwordMessage: passwordNotMatchError };
    case "reset":
      return passwordInitialMessage;
    default:
      throw new Error(`Unexpected action type ${action.type}`);
  }
}
