import {
  nicknameDuplicateError,
  nicknameNullError,
  nicknameSpaceError,
} from "../utils/errorMessage";

export const nicknameInitialMessage = { nicknameMessage: "" };

//닉네임 hyperText
export function nicknameReduer(_, action) {
  switch (action.type) {
    case "nicknameNull":
      return { nicknameMessage: nicknameNullError };
    case "nicknameSpace":
      return { nicknameMessage: nicknameSpaceError };
    case "nicknameDuplicate":
      return { nicknameMessage: nicknameDuplicateError };
    case "reset":
      return nicknameInitialMessage;
    default:
      throw new Error(`Unexpected action type ${action.type}`);
  }
}
