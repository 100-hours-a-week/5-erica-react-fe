import {
  emailNullError,
  emailNotValidError,
  emailDuplicateError,
} from "../utils/errorMessage";

export const emailInitialMessage = { emailMessage: "" };

//이메일 hyperText
export function emailMessageReducer(_, action) {
  switch (action.type) {
    case "emailNull":
      return { emailMessage: emailNullError };
    case "emailNotValid":
      return { emailMessage: emailNotValidError };
    case "emailDuplicate":
      return { emailMessage: emailDuplicateError };
    case "reset":
      return emailInitialMessage;
    default:
      throw new Error(`Unexpected action type ${action.type}`);
  }
}
