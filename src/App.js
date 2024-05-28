import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UpdatePassword from "./pages/UpdatePasswordPage";
import UpdateProfile from "./pages/UpdateProfilePage";
import { Posts } from "./pages/PostsPage";
import { AddPost } from "./pages/AddPostPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { UpdatePost } from "./pages/UpdatePostPage";
import Home from "./pages/Home";

import styles from "./App.module.css";

import { navUrl } from "./utils/navigate";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Navbar />
        <section className={styles.container}>
          <div className={styles.main}>
            <Routes>
              <Route path={navUrl.home} element={<Home />}></Route>
              <Route path={navUrl.posts} element={<Posts />}></Route>
              <Route path={navUrl.addPost} element={<AddPost />}></Route>
              <Route
                path={navUrl.postDetail}
                element={<PostDetailPage />}
              ></Route>
              <Route path={navUrl.updatePost} element={<UpdatePost />}></Route>
              <Route
                path={navUrl.updateProfile}
                element={<UpdateProfile />}
              ></Route>
              <Route
                path={navUrl.updatePassword}
                element={<UpdatePassword />}
              ></Route>
            </Routes>
          </div>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
