import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../../redux/slices/user";
import AuthWithGoogle from "../socialAuthentication/AuthWithGoogle";
import AuthWithGitHub from "../socialAuthentication/AuthWithGitHub";
import AuthWithX from "../socialAuthentication/AuthWithX";
import { RootState } from "../../../redux/store";
import { useSignIn } from "../../../hooks/authentication/useSignIn";

function SignIn() {
  const rememberMe = useSelector((state: RootState) => state.user.rememberMe);
  const [invalidCredential, setInvalidCredential] = useState("");
  const [logInCredentials, setLogInCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const dispatch = useDispatch();

  const { signIn } = useSignIn(); // signIn function from the hook

  function getEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setLogInCredentials({ ...logInCredentials, email: event.target.value });
  }

  function getPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setLogInCredentials({ ...logInCredentials, password: event.target.value });
  }

  function handleRememberMe(event: React.ChangeEvent<HTMLInputElement>) {
    setLogInCredentials({
      ...logInCredentials,
      rememberMe: event.target.checked,
    });

    dispatch(userActions.userRememberMe(event.target.checked));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signIn(logInCredentials); // calling the signIn function from the hook

      // clear form data
      setLogInCredentials({
        email: "",
        password: "",
        rememberMe: logInCredentials.rememberMe,
      });
    } catch (error) {
      console.error(error);
      setInvalidCredential("Wrong Credential - try again");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[825px]">
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
          <div className="mb-4">
            <div className="flex items-center">
              <input
                onChange={handleRememberMe}
                type="checkbox"
                role="switch"
                id="rememberMe"
                checked={rememberMe ? rememberMe : logInCredentials.rememberMe}
                className="mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              />
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer ml-2">
                Remember Me
              </label>
            </div>
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
