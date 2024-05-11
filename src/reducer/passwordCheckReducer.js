import {
  passwordCheckNullError,
  passwordNotSameError,
} from "../utils/errorMessage";

export const passwordCheckInitialMessage = { passwordCheckMessage: "" };

//패스워드 확인 hyperText
export function passwordCheckMessageReducer(_, action) {
  switch (action.type) {
    case "passwordCheckNull":
      return { passwordCheckMessage: passwordCheckNullError };
    case "passwordNotSame":
      return { passwordCheckMessage: passwordNotSameError };
    case "reset":
      return passwordCheckInitialMessage;
    default:
      throw new Error(`Unexpected action type ${action.type}`);
  }
}
