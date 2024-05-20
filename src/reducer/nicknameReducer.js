import {
  nicknameDuplicateError,
  nicknameNullError,
  nicknameSpaceError,
} from "../utils/errorMessage";
import { NICKNAME_STATUS } from "../utils/status";

export const nicknameInitialMessage = { nicknameMessage: "" };

//닉네임 hyperText
export function nicknameMessageReduer(_, action) {
  switch (action.type) {
    case NICKNAME_STATUS.Null:
      return { nicknameMessage: nicknameNullError };
    case NICKNAME_STATUS.Space:
      return { nicknameMessage: nicknameSpaceError };
    case NICKNAME_STATUS.Duplicate:
      return { nicknameMessage: nicknameDuplicateError };
    case NICKNAME_STATUS.Reset:
      return nicknameInitialMessage;
    default:
      throw new Error(`Unexpected action type ${action.type}`);
  }
}
