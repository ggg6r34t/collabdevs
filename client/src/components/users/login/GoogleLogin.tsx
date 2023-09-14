import React, { useState } from "react";

import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import user from "../../../assets/images/logos/googleLoginImage.webp";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/types";
import { useDispatch } from "react-redux";
import { userActions } from "../../../redux/slices/user";

export type UserGoogle = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar: string;
};
export default function GoogleLogIn() {
  const [userGoogle, setUserGoogle] = useState<UserGoogle>({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    avatar: user,
  });
  // function
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <button className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#DB4437] text-white py-2 border rounded-[12px] hover:bg-blue-200 mb-2">
      <FontAwesomeIcon icon={faGoogle} className="w-6 h-6 mr-2 rounded-full" />

      <GoogleLogin
        type="standard"
        size="small"
        shape="pill"
        onSuccess={async (credentialResponse) => {
          const url = `http://localhost:8000/api/v1/users/google-login`;
          const credential = credentialResponse.credential;
          let res = await axios.post(url, { id_token: credential });
          if (res.status === 200) {
            setUserGoogle(res.data.userData);
            const user = res.data.userData;

            const userToken = res.data.token; // from data object. get and assign the token
            // const userId = currentUser?._id
            localStorage.setItem("userToken", userToken); // save it (token) to the localStorage
            const currentUserInformation: User = {
              ...user,
              token: userToken,
            };
            const id = user._id;
            dispatch(userActions.setUserData(res.data.userData)); // store userinformation to the redux
  
            dispatch(userActions.userLogin(true));
            navigate("/");
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
