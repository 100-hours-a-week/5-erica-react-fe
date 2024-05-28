import { navUrl } from "../utils/navigate";
import { Navigate } from "react-router-dom";

export default function withLogIn(Component) {
  return function (props) {
    if (props.error) {
      alert("로딩 중 에러 발생");
    }

    if (props.logIn === false) {
      alert("로그인 하십시오.");
      return <Navigate to={navUrl.home} />;
    }

    return <Component {...props} />;
  };
}
