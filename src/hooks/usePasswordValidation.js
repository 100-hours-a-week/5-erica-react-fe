import { useState, useEffect } from "react";

export function usePasswordValidation(
  password,
  passwordCheck,
  passwordCheckState,
  passwordState
) {
  const [isAble, setIsAble] = useState(false);

  useEffect(
    function enableButton() {
      setIsAble(
        password &&
          passwordCheck &&
          !passwordState.passwordMessage &&
          !passwordCheckState.passwordCheckMessage
      );
    },
    [password, passwordCheck, passwordState, passwordCheckState]
  );

  return isAble;
}
