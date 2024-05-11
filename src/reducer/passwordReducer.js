import {
  passwordNullError,
  passwordNotSameError,
  passwordNotMatchError,
} from "../utils/errorMessage";
import { PASSWORD_STATUS } from "../utils/status";

export const passwordInitialMessage = { passwordMessage: "" };

//패스워드 hyperText
export function passwordMessageReducer(_, action) {
  switch (action.type) {
    case PASSWORD_STATUS.Null:
      return { passwordMessage: passwordNullError };
    case PASSWORD_STATUS.NotSame:
      return { passwordMessage: passwordNotSameError };
    case PASSWORD_STATUS.NotMatch:
      return { passwordMessage: passwordNotMatchError };
    case PASSWORD_STATUS.Reset:
      return passwordInitialMessage;
    default:
      throw new Error(`Unexpected action type ${action.type}`);
  }
}
