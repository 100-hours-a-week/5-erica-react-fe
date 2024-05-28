import styles from "../styles/user/UpdatePassword.module.css";
import { headers } from "../static";
import useFetch from "../hooks/useFetch";
import { AuthUpdatePassword } from "../components/users/UpdatePasswordContainer";
import { FetchUrl } from "../utils/constants";

export default function UpdatePassword() {
  const { responseData, error, logIn } = useFetch(FetchUrl.logIn, {
    headers,
    credentials: "include",
  });

  return (
    <section className={styles.passwordMain}>
      <p className={styles.pageTitle}>비밀번호 수정</p>
      <AuthUpdatePassword responseData={responseData?.data} error={error} logIn={logIn} />
    </section>
  );
}



