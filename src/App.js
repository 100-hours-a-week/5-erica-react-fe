import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/users/LogIn";
import SignUp from "./components/users/SignUp";
import Posts from "./components/posts/Posts";
import Navbar from "./components/Navbar";
import PostDetail from "./components/posts/PostDetail";
import UpdatePost from "./components/posts/UpdatePost";
import AddPost from "./components/posts/AddPost";
import UpdateProfile from "./components/users/UpdateProfile";
import UpdatePassword from "./components/users/UpdatePassword";

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
            <Route path={logIn} element={<LogIn />}></Route>
            <Route path={signUp} element={<SignUp />}></Route>
            <Route path={posts} element={<Posts />}></Route>
            <Route path={addPost} element={<AddPost />}></Route>
            <Route path={postDetail} element={<PostDetail />}></Route>
            <Route path={updatePost} element={<UpdatePost />}></Route>
            <Route path={updateProfile} element={<UpdateProfile />}></Route>
            <Route path={updatePassword} element={<UpdatePassword />}></Route>
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
