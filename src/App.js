import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import PostsPage from "./pages/PostsPage";
import Navbar from "./components/Navbar";
import PostDetailPage from "./pages/PostDetailPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import AddPostPage from "./pages/AddPostPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";

import styles from "./App.module.css";

function App() {
  const logIn = "/";
  const signUp = "/signUp";
  const posts = "/posts";
  const postDetail = "/posts/:id";
  const addPost = "/posts/write";
  const updatePost = "/posts/:id/update";
  const updateProfile = "/user/update";
  const updatePassword = "/user/password";

  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Navbar />
        <section className={styles.main}>
          <Routes>
            <Route path={logIn} element={<LogInPage />}></Route>
            <Route path={signUp} element={<SignUpPage />}></Route>
            <Route path={posts} element={<PostsPage />}></Route>
            <Route path={addPost} element={<AddPostPage />}></Route>
            <Route path={postDetail} element={<PostDetailPage />}></Route>
            <Route path={updatePost} element={<UpdatePostPage />}></Route>
            <Route path={updateProfile} element={<UpdateProfilePage />}></Route>
            <Route
              path={updatePassword}
              element={<UpdatePasswordPage />}
            ></Route>
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
