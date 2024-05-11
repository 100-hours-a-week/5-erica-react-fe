import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useShowProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const { pathname } = useLocation();

  useEffect(
    function showProfile() {
      if (pathname !== "/" && pathname !== "/signUp") {
        setShowProfile(true);
      } else {
        setShowProfile(false);
      }

      if (pathname === "/signUp" || pathname.includes("/posts")) {
        setShowBackButton(true);
      } else {
        setShowBackButton(false);
      }
    },
    [pathname]
  );

  return { pathname, showProfile, showBackButton };
}
