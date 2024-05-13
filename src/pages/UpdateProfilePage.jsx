import styles from "../styles/UpdateProfile.module.css";
import { backHost, headers } from "../static";
import {AuthUpdateProfile} from "../components/users/UpdateProfileContainer"
import useFetch from "../hooks/useFetch";

export default  function UpdateProfile() {
  const {responseData, error, logIn} = useFetch(`${backHost}/api/users/user`, {
    headers,
    credentials: "include",
  })

  return (
    <section className={styles.updateMain}>
      <p className={styles.pageTitle}>회원정보 수정</p>
      <AuthUpdateProfile responseData={responseData?.data} logIn={logIn}  error={error} />
    </section>
  );
}

