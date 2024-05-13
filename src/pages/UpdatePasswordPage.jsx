import styles from "../styles/UpdatePassword.module.css";
import { backHost, headers } from "../static";
import useFetch from "../hooks/useFetch";
import { AuthUpdatePassword } from "../components/users/UpdatePasswordContainer";

export default function UpdatePassword() {
  const { responseData, error, logIn } = useFetch(`${backHost}/api/users/logIn`, {
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



