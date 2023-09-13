import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { UserGoogle } from "../../../type/types";

function AuthWithGoogle() {
  const [userGoogle, setUserGoogle] = useState<UserGoogle>({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    avatar: "",
  });
  // function

  return (
    <button className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#DB4437] text-white py-2 border rounded-[12px] hover:bg-blue-200 mb-2">
      <FontAwesomeIcon icon={faGoogle} className="w-6 h-6 mr-2 rounded-full" />

      <GoogleLogin
        // type="icon"
        size="medium"
        //shape="rectangular"
        onSuccess={async (credentialResponse) => {
          //  console.log(credentialResponse, "credential");
          const url = `http://localhost:8000/api/v1/users/google-login`;
          const credential = credentialResponse.credential;
          let res = await axios.post(url, { id_token: credential });
          if (res.status === 200) {
            console.log(res, "response from BE");
            setUserGoogle(res.data.userData);
          } else {
            alert("Login false");
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </button>
  );
}

export default AuthWithGoogle;
