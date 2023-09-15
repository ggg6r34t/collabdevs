import { useEffect, useState } from "react";

import "./App.css";
import Post from "./components/post/PostSection";
import { Route, Routes } from "react-router-dom";
import PostForm from "./components/forms/PostForm";
import Navbar from "./components/layouts/navbar/Navbar";
import Footer from "./components/layouts/footer/Footer";
import Banner from "./components/layouts/banner/Banner";
import SignIn from "./components/authentication/sign-in/SignIn";
import SignUp from "./components/authentication/sign-up/SignUp";
import Profile from "./components/user/profile/Profile";
import SavedPosts from "./components/savedPost/SavedPost";
import PostDetail from "./components/postDetail/PostDetail";
// import UserSection from "./components/admin/userlist/UserSection";
import UserList from "./components/admin/userlist/UserList";

function App() {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const hasSeenImage = localStorage.getItem("hasSeenImage");

    if (hasSeenImage) {
      setShowImage(false);
    } else {
      setTimeout(() => {
        setShowImage(false);

        localStorage.setItem("hasSeenImage", "true");
      }, 3000);
    }
  }, []);

  return (
    <div>
      {showImage ? (
        <Banner />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/saved-posts/:id" element={<SavedPosts />} />
            <Route path="/" element={<Post />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/create-post" element={<PostForm />} />

            <Route path="/banner" element={<Banner />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
