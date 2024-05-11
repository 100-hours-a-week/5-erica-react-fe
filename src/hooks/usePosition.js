import { useState, useEffect } from "react";
import { getScrollPosition } from "../utils/scroll.js";

export function usePosition(isShow) {
  const [position, setPosition] = useState("");
  useEffect(
    function getPosition() {
      setPosition(getScrollPosition().scrollPosition);
    },
    [isShow]
  );

  return position;
}
