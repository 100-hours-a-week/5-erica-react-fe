import {
  passwordCheckNullError,
  passwordNotSameError,
} from "../utils/errorMessage";
import { PASSWORD_CHECK_STATUS } from "../utils/status";

export const passwordCheckInitialMessage = { passwordCheckMessage: "" };

//패스워드 확인 hyperText
export function passwordCheckMessageReducer(_, action) {
  switch (action.type) {
    case PASSWORD_CHECK_STATUS.Null:
      return { passwordCheckMessage: passwordCheckNullError };
    case PASSWORD_CHECK_STATUS.NotSame:
      return { passwordCheckMessage: passwordNotSameError };
    case PASSWORD_CHECK_STATUS.Reset:
      return passwordCheckInitialMessage;
    default:
      throw new Error(`Unexpected action type ${action.type}`);
  }
}
