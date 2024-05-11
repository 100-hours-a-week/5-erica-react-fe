import { useState, useEffect } from "react";

export function useSignUpValidation(
  email,
  password,
  passwordCheck,
  nickname,
  profileImage,
  emailState,
  passwordState,
  passwordCheckState,
  nicknameState
) {
  const [isValid, setIsValid] = useState(false);

  useEffect(
    function checkIsValid() {
      setIsValid(
        profileImage &&
          email &&
          password &&
          passwordCheck &&
          nickname &&
          !emailState.emailMessage &&
          !passwordState.passwordMessage &&
          !passwordCheckState.passwordCheckMessage &&
          !nicknameState.nicknameMessage
      );
    },
    [
      profileImage,
      email,
      password,
      passwordCheck,
      nickname,
      emailState,
      passwordState,
      passwordCheckState,
      nicknameState,
    ]
  );

  return isValid;
}
