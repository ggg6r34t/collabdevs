import axios from "axios";
import { useState } from "react";
import DOMPurify from "dompurify";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BASE_URL } from "../../../api/api";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    firstName: "",
    lastName: "",
  }); // store validation errors
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const navigate = useNavigate();

  const sanitizeInput = (name: string, value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    sanitizeInput(name, value); // sanitize the input

    // reset validation errors for the changed input field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const validationErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      firstName: "",
      lastName: "",
    };

    if (!formData.userName.match(/^[A-Za-z0-9_]{3,30}$/)) {
      validationErrors.userName =
        "Username must be 3-30 characters and may contain numbers and underscores.";
    }

    if (formData.password.trim().length < 8) {
      validationErrors.password =
        "Password must be at least 8 characters long.";
    }

    if (
      formData.password.trim().toLowerCase() !==
      formData.confirmPassword.trim().toLowerCase()
    ) {
      validationErrors.confirmPassword =
        "Password and Confirm Password do not match.";
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      validationErrors.email = "Invalid email address.";
    }

    if (!formData.firstName || !formData.lastName) {
      validationErrors.firstName = "Please provide your first and last name.";
    }

    setErrors(validationErrors);

    // check if there are no validation errors
    const valid = Object.values(validationErrors).every(
      (error) => error === ""
    );

    // set the isFormValid state
    setIsFormValid(valid);

    return valid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      const endpoint = `${BASE_URL}/api/v1/users/register`;
      axios
        .post(endpoint, formData)
        .then((response) => {
          if (response.status === 201) {
            confirmAlert({
              title: `Congratulation! ${formData.userName}`,
              message:
                "You successfully created an account. Click OK to login.",
              buttons: [
                {
                  label: "OK",
                  onClick: () => navigate("/signin"),
                },
              ],
            });
            // clear form only if registration is successful
            setFormData({
              email: "",
              password: "",
              confirmPassword: "",
              userName: "",
              firstName: "",
              lastName: "",
            });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 409) {
            confirmAlert({
              title: "Error!",
              message: "User name or email already registered.",
              buttons: [
                {
                  label: "OK",
                },
              ],
            });
          } else {
            console.log(error);
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center h-screen">
      <div className="w-1/6 flex flex-col justify-center items-center p-6 border rounded-[12px] shadow-md bg-gray-100 dark:bg-slate-800">
        <form method="post" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mr-auto mb-4">Sign Up</h2>
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="firstName"
              required
              className="w-65 h-9.5 dark:bg-slate-800 px-3 py-2 border border-gray-400 rounded-[12px]"
              placeholder="First Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Last Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="lastName"
              required
              className="w-65 h-9.5 dark:bg-slate-800 px-3 py-2 border border-gray-400 rounded-[12px]"
              placeholder="Last Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Display Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="userName"
              required
              autoComplete="username"
              className="w-65 h-9.5 dark:bg-slate-800 px-3 py-2 border border-gray-400 rounded-[12px]"
              placeholder="Dispaly Name"
            />
            {errors.userName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.userName}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              required
              autoComplete="username"
              className="w-65 h-9.5 dark:bg-slate-800 px-3 py-2 border border-gray-400 rounded-[12px]"
              placeholder="Email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={passwordVisible ? "text" : "password"}
                name="password"
                required
                autoComplete="current-password"
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
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Confirm Password</label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                required
                autoComplete="new-password"
                className="w-65 h-9.5 dark:bg-slate-800 px-3 py-2 border border-gray-400 rounded-[12px]"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-2 right-3 text-gray-600"
              >
                {confirmPasswordVisible ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <p className="text-xs mb-4">
            Passwords must contain at least 8 characters, including at least 1
            letter and 1 number.
          </p>
          <button
            type="submit"
            className="w-65 h-9.5 bg-white text-[#010536] hover:text-white py-2 border border-gray-400 rounded-[12px] hover:bg-[#010536]"
          >
            Sign Up
          </button>
          {!isFormValid && (
            <p className="text-red-500 text-xs mt-1">
              Please fill out the form correctly before submitting.
            </p>
          )}
        </form>
        <div className="w-65 flex flex-col mt-4">
          <p className="text-xs mb-2">
            By clicking{" "}
            <Link to="/signup" className="font-medium underline">
              “Sign up”
            </Link>
            , you agree to our{" "}
            <Link
              to="/legal/terms-of-service"
              className="font-medium underline"
            >
              terms of service
            </Link>{" "}
            and acknowledge that you have read and understand our{" "}
            <Link to="/legal/privacy-policy" className="font-medium underline">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link to="/legal/code-of-conduct" className="font-medium underline">
              code of conduct
            </Link>
            .
          </p>
          <div>
            Already have an account?
            <span>
              <Link to="/signin" className="font-medium ml-1">
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
