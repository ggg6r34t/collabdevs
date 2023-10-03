import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

import { BASE_URL } from "../../../api/api";

const AuthWithX = () => {
  const [error, setError] = useState("");

  const handleXAuth = () => {
    setError("");
    window.open(`${BASE_URL}/api/v1/auth/twitter`, "_self");
  };

  const handleXLoginError = () => {
    setError("Sign in with X failed. Please try again later.");
  };

  return (
    <div>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <button
        className="w-65 h-9.5 flex flex-row items-center justify-center bg-gray-950 text-white py-2 border rounded-[12px] dark:hover:bg-gray-500 hover:bg-blue-200 mb-2"
        onClick={handleXAuth}
        onError={handleXLoginError}
      >
        <FontAwesomeIcon
          icon={faXTwitter}
          className="w-6 h-6 mr-2 rounded-full"
        />
        Sign in with <span className="text-[17px] px-1">X</span> (Twitter)
      </button>
    </div>
  );
};

export default AuthWithX;
