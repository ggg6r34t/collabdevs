import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    <div>
      <label
        htmlFor="theme-preferences"
        className="text-gray-600 dark:text-white block ml-2 mb-2"
      >
        Theme Preferences
      </label>
      <select
        id="theme-preferences"
        className="dark:bg-slate-800 dark:text-white border rounded-md p-2"
        value={!darkMode ? "light" : "dark"}
        onChange={handleToggleMode}
      >
        <option value="light">Light Theme</option>
        <option value="dark">Dark Theme</option>
      </select>
    </div>
  );
}

export default ToggleThemeMode;
