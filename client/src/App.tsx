import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import "./App.css";
import routes from "./routes";
import Navbar from "./components/layouts/navbar/Navbar";
import Footer from "./components/layouts/footer/Footer";
import Banner from "./components/homePage/Banner";

function App() {
  const [showImage, setShowImage] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  const getRoutes = (allRoutes: any) =>
    allRoutes.map((route: any) => (
      <Route path={route.path} element={<route.component />} key={route.path} />
    ));

  return (
    <div className="transition duration-200 dark:bg-slate-900 dark:text-white">
      {showImage ? (
        <Banner />
      ) : (
        <>
          <Navbar />
          <Routes>
            {getRoutes(routes)}
            {/* "Not Found" route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
