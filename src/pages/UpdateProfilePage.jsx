import styles from "../styles/UpdateProfile.module.css";
import { headers } from "../static";
import {AuthUpdateProfile} from "../components/users/UpdateProfileContainer"
import useFetch from "../hooks/useFetch";
import { FetchUrl } from "../utils/constants";

export default  function UpdateProfile() {
  const {responseData, error, logIn} = useFetch(FetchUrl.user, {
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

