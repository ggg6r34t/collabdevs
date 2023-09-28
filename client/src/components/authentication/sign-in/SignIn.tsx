import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { userActions } from "../../../redux/slices/user";
import { Link, useNavigate } from "react-router-dom";
import AuthWithGoogle from "../socialAuthentication/AuthWithGoogle";
import AuthWithGitHub from "../socialAuthentication/AuthWithGitHub";
import AuthWithX from "../socialAuthentication/AuthWithX";
import { BASE_URL } from "../../../api/api";
import { User } from "../../../type/types";

function SignIn() {
  const [invalidCredential, setInvalidCredential] = useState("");
  const [logInCredentials, setLogInCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function getEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setLogInCredentials({ ...logInCredentials, email: event.target.value });
  }

  function getPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setLogInCredentials({ ...logInCredentials, password: event.target.value });
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const endpoint = `${BASE_URL}/api/v1/users/login`;
    axios
      .post(endpoint, logInCredentials)

      .then((response) => {
        if (response.status === 200) {
          // store the userData and userToken securely (e.g., in local storage or cookie)
          const user = response.data.userData;
          const userToken = response.data.token; // from data object. get and assign the token

          // save userData to redux
          const userWithData: User = {
            ...user,
            token: userToken,
          };

          dispatch(userActions.setUserData(userWithData)); // store userinformation to the redux

          localStorage.setItem("userToken", userToken); // save it (token) to the localStorage

          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setInvalidCredential("Wrong Credential - try again");
      });

    // clear form
    setLogInCredentials({
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/6 flex flex-col justify-center items-center p-6 border rounded-[12px] shadow-md dark:bg-slate-800">
        <AuthWithGoogle />
        <AuthWithGitHub />
        <AuthWithX />
        <div className="w-65 h-9.5 flex flex-row items-center justify-center mb-3">
          <hr className="w-1/3 border dark:border-white border-black mr-4" /> Or{" "}
          <hr className="w-1/3 border dark:border-white border-black ml-4" />
        </div>
        <form action="post" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mr-auto mb-4">Sign In</h2>
          {invalidCredential !== "" ? (
            <div className="error">
              {invalidCredential} <br />
              <Link to="api/v1/users/register">
                Don't have an account yet? Sign Up
              </Link>
            </div>
          ) : null}
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              onChange={getEmail}
              type="email"
              className="w-65 h-9.5 dark:bg-slate-800 px-3 py-2 border border-gray-400 rounded-[12px]"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              onChange={getPassword}
              type="password"
              className="w-65 h-9.5 dark:bg-slate-800 px-3 py-2 border border-gray-400 rounded-[12px]"
              placeholder="Password"
            />
          </div>
          <button className="w-65 h-9.5 bg-white text-[#010536] hover:text-white py-2 border border-gray-400 rounded-[12px] hover:bg-[#010536]">
            Sign In
          </button>
        </form>
        <div className="w-65 flex flex-col mt-4">
          <Link to="/" className="font-medium">
            Forgot password?
          </Link>
          <div>
            Don't have an account?
            <span>
              <Link to="/signup" className="font-medium ml-1">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
