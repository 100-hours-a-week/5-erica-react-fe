import {
  emailNullError,
  emailNotValidError,
  emailDuplicateError,
} from "../utils/errorMessage";
import { EMAIL_STATUS } from "../utils/status";

export const emailInitialMessage = { emailMessage: "" };

//이메일 hyperText
export function emailMessageReducer(_, action) {
  switch (action.type) {
    case EMAIL_STATUS.Null:
      return { emailMessage: emailNullError };
    case EMAIL_STATUS.NotValid:
      return { emailMessage: emailNotValidError };
    case EMAIL_STATUS.Duplicate:
      return { emailMessage: emailDuplicateError };
    case EMAIL_STATUS.Reset:
      return emailInitialMessage;
    default:
      throw new Error(`Unexpected action type ${action.type}`);
  }
}
