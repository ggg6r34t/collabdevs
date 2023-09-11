import React, { useEffect, useState } from "react";

import "./App.css";
import Post from "./components/post/PostSection";
import { Route, Routes } from "react-router-dom";
import PostForm from "./components/forms/PostForm";
import CommentForm from "./components/forms/CommentForm";
import Navbar from "./components/layouts/navbar/Navbar";
import Footer from "./components/layouts/footer/Footer";
import Banner from "./components/layouts/banner/Banner";

function App() {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    // Check if the user has already seen the image
    const hasSeenImage = localStorage.getItem("hasSeenImage");

    if (hasSeenImage) {
      // User has seen the image before, hide it immediately
      setShowImage(false);
    } else {
      // User is seeing the image for the first time, set a timer to hide it after 5 seconds
      setTimeout(() => {
        setShowImage(false);

        // Mark that the user has seen the image to prevent it from showing again
        localStorage.setItem("hasSeenImage", "true");
      }, 3000); // 3000 milliseconds = 5 seconds
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
            <Route path="/" element={<Post />} />
            <Route path="/create-post" element={<PostForm />} />
            <Route path="/comment" element={<CommentForm />} />
            <Route path="/banner" element={<Banner />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
