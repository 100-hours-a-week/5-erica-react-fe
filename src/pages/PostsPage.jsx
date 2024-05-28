
import MiniPost from "../components/posts/MiniPost";
import styles from "../styles/Posts.module.css";
import withLogIn from "../hoc/withLogIn";
import withLoading from "../hoc/withLoading";
import { headers } from "../static";
import useFetch from "../hooks/useFetch";
import { FetchUrl } from "../utils/constants";
import Layout from "../components/Layout";

export function Posts() {
  const { responseData: userResponseData, error: userError, logIn: userLogIn } = useFetch(FetchUrl.user, {
    headers,
    credentials: "include",
  });


  const { responseData, loading } = useFetch(FetchUrl.posts, {
    headers,
    credentials: "include",
  });

  return (
    <AuthLayout logIn={userLogIn} error={userError} responseData={userResponseData?.data}>
      <section className={styles.postsMain}>
        <LoadingMiniPosts  loading={loading} responseData={responseData?.data} />
      </section>
    </AuthLayout>
  );
}

function MiniPostList({ responseData }) {
  return (
      <div className={styles.postsWrapper}>
        {responseData.map((post) => (
          <MiniPost key={post.postId} data={post} />
        ))}
        <div className={styles.target}></div>
      </div>
  );
}

const LoadingMiniPosts = withLoading(MiniPostList, "posts");
const AuthLayout = withLogIn(Layout)

export default Posts;
