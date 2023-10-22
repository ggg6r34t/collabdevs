// import axios from "axios";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

// import { userActions } from "../../../redux/slices/user";
import { BASE_URL } from "../../../api/api";
// import { User } from "../../../type/types";

const AuthWithGoogle = () => {
  const [error, setError] = useState("");

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    setError("");
    window.open(`${BASE_URL}/api/v1/auth/google`, "_self");
  };

  const handleGoogleLoginError = () => {
    setError("Sign in with X failed. Please try again later.");
  };

  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/v1/auth/google`, {
  //       withCredentials: true,
  //     });

  //     if (res.status === 200) {
  //       const user = res.data.userData;
  //       const userToken = res.data.token;

  //       const userWithData: User = {
  //         ...user,
  //         token: userToken,
  //       };

  //       dispatch(userActions.setUserData(userWithData));

  //       localStorage.setItem("userToken", userToken);

  //       navigate("/");
  //     } else {
  //       if (res.data && res.data.error) {
  //         setError(res.data.error);
  //       } else {
  //         setError("Sign in with Google failed. Please try again later.");
  //       }
  //     }
  //   } catch (err: any) {
  //     setError(
  //       `An error occurred while signing in with Google: ${err.message}`
  //     );
  //     console.error(err);
  //   }
  // };

  return (
    <div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <button
        className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#DB4437] text-white py-2 border rounded-[12px] dark:hover:bg-gray-500 hover:bg-blue-200 mb-2"
        onClick={handleGoogleAuth}
        onError={handleGoogleLoginError}
      >
        <FontAwesomeIcon
          icon={faGoogle}
          className="w-6 h-6 mr-2 rounded-full"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default AuthWithGoogle;
