import { useEffect, useState } from "react";
import { backHost, headers } from "../static";
import { navUrl } from "../utils/navigate";
import { Navigate } from "react-router-dom";

export default function withLogIn(Component) {
  return function (props) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const fetchApi = async () => {
      try {
        const res = await fetch(`${backHost}/api/users/logIn`, {
          headers,
          credentials: "include",
        });
        const json = await res.json();
        if (json.status === 403 || json.status === 401) {
          alert("로그인 해주세요.");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    useEffect(function fetchedData() {
      fetchApi();
    }, []);

    if (isLoggedIn === null) return <div>로딩 중...</div>;

    return isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Navigate to={navUrl.logIn} />
    );
  };
}
