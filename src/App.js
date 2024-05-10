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

import { navUrl } from "./utils/navigate";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Navbar />
        <section className={styles.main}>
          <Routes>
            <Route path={navUrl.logIn} element={<LogInPage />}></Route>
            <Route path={navUrl.signUp} element={<SignUpPage />}></Route>
            <Route path={navUrl.posts} element={<PostsPage />}></Route>
            <Route path={navUrl.addPost} element={<AddPostPage />}></Route>
            <Route
              path={navUrl.postDetail}
              element={<PostDetailPage />}
            ></Route>
            <Route
              path={navUrl.updatePost}
              element={<UpdatePostPage />}
            ></Route>
            <Route
              path={navUrl.updateProfile}
              element={<UpdateProfilePage />}
            ></Route>
            <Route
              path={navUrl.updatePassword}
              element={<UpdatePasswordPage />}
            ></Route>
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
