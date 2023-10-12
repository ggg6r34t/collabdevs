import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import "./App.css";
import routes from "./routes";
import Navbar from "./components/layouts/navbar/Navbar";
import Footer from "./components/layouts/footer/Footer";
import Banner from "./components/homePage/Banner";
import { useAutoSignOut } from "./hooks/authentication/useAutoSignOut";

const TOKEN_EXPIRATION_CHECK_INTERVAL = 900000; // 15 mins

function App() {
  const [showImage, setShowImage] = useState(true);
  const { pathname } = useLocation();
  const { autoSignOut } = useAutoSignOut();

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
      }, 3000); // 3 secs
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      autoSignOut();
    }, TOKEN_EXPIRATION_CHECK_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [autoSignOut]);

  const getRoutes = (allRoutes: any) =>
    allRoutes.map((route: any) => (
      <Route path={route.path} element={<route.component />} key={route.path} />
    ));

  return (
    <div
      className={localStorage.getItem("darkMode") === "true" ? "dark" : "light"}
    >
      {showImage ? (
        <Banner />
      ) : (
        <div className="transition duration-200 dark:bg-slate-900 dark:text-white">
          <Navbar />
          <Routes>
            {getRoutes(routes)}
            {/* "Not Found" route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
