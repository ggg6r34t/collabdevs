import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { BASE_URL } from "../../../api/api";

function AuthWithGitHub() {
  const [error, setError] = useState("");

  const handleGitHubAuth = () => {
    setError("");
    window.open(`${BASE_URL}/api/v1/auth/github`, "_self");
  };

  const handleGitHubLoginError = () => {
    setError("Sign in with GitHub failed. Please try again later.");
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <button
        className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#181717] text-white py-2 border rounded-[12px] dark:hover:bg-gray-500 hover:bg-blue-200 mb-2"
        onClick={handleGitHubAuth}
        onError={handleGitHubLoginError}
      >
        <FontAwesomeIcon
          icon={faGithub}
          className="w-6 h-6 mr-2 rounded-full"
        />
        Sign in with GitHub
      </button>
    </div>
  );
}

export default AuthWithGitHub;
