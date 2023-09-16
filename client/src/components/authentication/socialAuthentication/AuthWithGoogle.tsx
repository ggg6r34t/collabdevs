import axios from "axios";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { userActions } from "../../../redux/slices/user";
import { BASE_URL } from "../../../api/api";

const AuthWithGoogle = () => {
  const functionDispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignInSuccess = async (
    credentialResponse: GoogleCredentialResponse
  ) => {
    try {
      const url = `${BASE_URL}/api/v1/users/google-login`;
      const credential = credentialResponse.credential;
      const response = await axios.post(url, { id_token: credential });

      if (response.status === 200) {
        const user = response.data.userData;

        functionDispatch(userActions.setUserData(user));

        navigate("/");
      } else {
        alert("Sign in failed");
      }
    } catch (error) {
      console.error("Error during Google Sign in:", error);
      alert("Sign in failed");
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Sign in Failed");
    alert("Sign in failed");
  };

  return (
    <button className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#DB4437] text-white py-2 border rounded-[12px] hover:bg-blue-200 mb-2">
      <FontAwesomeIcon icon={faGoogle} className="w-6 h-6 mr-2 rounded-full" />

      <GoogleLogin
        size="medium"
        onSuccess={handleGoogleSignInSuccess}
        onError={handleGoogleLoginError}
      />
    </button>
  );
};

export default AuthWithGoogle;
