import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { formActions } from "../../../redux/slices/form";
import { userActions } from "../../../redux/slices/user";
import AuthWithX from "../socialAuthentication/AuthWithX";
import AuthWithGoogle from "../socialAuthentication/AuthWithGoogle";
import AuthWithGitHub from "../socialAuthentication/AuthWithGitHub";
import { useSignIn } from "../../../hooks/authentication/useSignIn";
import { RootState } from "../../../redux/store";

function SignIn() {
  const rememberMe = useSelector((state: RootState) => state.user.rememberMe);
  const logInCredentials = useSelector((state: RootState) => state.form);

  const [emailError, setEmailError] = useState("");
  const [passwordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [invalidCredential, setInvalidCredential] = useState("");

  const dispatch = useDispatch();

  const { signIn } = useSignIn(); // signIn function from the hook

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const sanitizeInput = (name: string, value: string) => {
    // check the input name to determine which field to sanitize
    let sanitizedValue = value;

    if (name === "email") {
      sanitizedValue = DOMPurify.sanitize(value);
      dispatch(formActions.setEmail(sanitizedValue));
    } else if (name === "password") {
      sanitizedValue = DOMPurify.sanitize(value);
      dispatch(formActions.setPassword(sanitizedValue));
    }
  };

  function validateEmail(email: string) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) {
      return "Email is required.";
    } else if (!emailRegex.test(email)) {
      return "Invalid email address.";
    }
    return "";
  }

  // function validatePassword(password: string) {
  //   if (!password) {
  //     return "Password is required.";
  //   } else if (password.length < 8) {
  //     return "Password must be at least 8 characters long.";
  //   }
  //   return "";
  // }

  function getEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    sanitizeInput("email", email); // sanitize the email input
    const error = validateEmail(email);
    setEmailError(error);
  }

  function getPassword(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    sanitizeInput("password", password); // sanitize the password input
    // const error = validatePassword(password);
    // setPasswordError(error);
  }

  function handleRememberMe(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    dispatch(formActions.setRememberMe(checked));
    dispatch(userActions.userRememberMe(checked));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signIn(logInCredentials); // calling the signIn function from the hook

      // clear form data
      dispatch(formActions.clearForm());
    } catch (error) {
      console.error(error);
      setInvalidCredential("Wrong Credentials - please try again.");
    }
  };

  const formIsValid = !emailError && !passwordError;

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
          {invalidCredential !== "" && (
            <div className="error">
              {invalidCredential} <br />
              <Link to="/signup">Don't have an account yet? Sign Up</Link>
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              onChange={getEmail}
              type="email"
              name="email"
              autoComplete="username"
              required
              className="w-65 h-9.5 dark:bg-slate-800 px-3 py-2 border border-gray-400 rounded-[12px]"
              placeholder="Email"
            />
            {emailError && (
              <span className="text-red-500 text-xs mt-1">{emailError}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <div className="relative">
              <input
                onChange={getPassword}
                type={passwordVisible ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                required
                className="w-65 h-9.5 dark:bg-slate-800 px-3 py-2 border border-gray-400 rounded-[12px]"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-2 right-3 text-gray-600"
              >
                {passwordVisible ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
            {passwordError && (
              <span className="text-red-500 text-xs mt-1">{passwordError}</span>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input
                onChange={handleRememberMe}
                type="checkbox"
                role="switch"
                id="rememberMe"
                checked={rememberMe || logInCredentials.rememberMe}
                className="mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              />
              <label className="inline-block pl-[0.15rem] hover:cursor-pointer ml-2">
                Remember Me
              </label>
            </div>
          </div>
          <button
            disabled={!formIsValid}
            className="w-65 h-9.5 bg-white text-[#010536] hover:text-white py-2 border border-gray-400 rounded-[12px] hover:bg-[#010536]"
          >
            Sign In
          </button>
        </form>
        <div className="w-65 flex flex-col mt-4">
          <Link to="/auth/reset-password" className="font-medium">
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
