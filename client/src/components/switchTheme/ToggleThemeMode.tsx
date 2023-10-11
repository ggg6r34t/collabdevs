import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { themeActions } from "../../redux/slices/themeMode";
import { RootState } from "../../redux/store";

function ToggleThemeMode() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.themes.mode);

  useEffect(() => {
    // update the class and local storage when the darkMode state changes
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      window.document.documentElement.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      window.document.documentElement.classList.remove("dark");
    } else {
      dispatch(
        themeActions.switchTheme(localStorage.getItem("darkMode") === "true")
      );
    }
  }, [darkMode, dispatch]);

  const handleToggleMode = () => {
    dispatch(themeActions.switchTheme(!darkMode));
  };

  return (
    <div className="ml-4">
      <label htmlFor="theme-toggle" className="toggle-label">
        <button
          id="theme-toggle"
          className="toggle-button rounded-md p-2"
          onClick={handleToggleMode}
          aria-label={`Toggle ${darkMode ? "Dark" : "Light"} Mode`}
        >
          <span className="toggle-icon">
            <FontAwesomeIcon
              icon={darkMode ? faSun : faMoon}
              className={`icon ${
                darkMode ? "text-gray-200" : "text-gray-400"
              } w-5 h-5`}
            />
          </span>
        </button>
      </label>
    </div>
  );
}

export default ToggleThemeMode;
