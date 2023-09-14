import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [signUpInformation, setSignUpInformation] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    firstName: "",
    lastName: "",
    avatar: "",
  });
  const navigate = useNavigate();
  function getEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setSignUpInformation({ ...signUpInformation, email: event.target.value });
  }

  function getPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setSignUpInformation({
      ...signUpInformation,
      password: event.target.value,
    });
  }

  function getConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setSignUpInformation({
      ...signUpInformation,
      confirmPassword: event.target.value,
    });
  }

  function getUserName(event: React.ChangeEvent<HTMLInputElement>) {
    setSignUpInformation({
      ...signUpInformation,
      userName: event.target.value,
    });
  }
  function getFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    setSignUpInformation({
      ...signUpInformation,
      firstName: event.target.value,
    });
  }

  function getLastName(event: React.ChangeEvent<HTMLInputElement>) {
    setSignUpInformation({
      ...signUpInformation,
      lastName: event.target.value,
    });
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    function onSuccess() {
      confirmAlert({
        title: `Congratulation! ${signUpInformation.userName}`,
        message: "You successfully created an account. Click OK to login.",
        buttons: [
          {
            label: "OK",
            onClick: () => navigate("/signin"),
          },
        ],
      });
    }

    if (
      signUpInformation.password?.toString().toLowerCase() !==
      signUpInformation.confirmPassword?.toString().toLowerCase()
    ) {
      confirmAlert({
        title: "Careful!",
        message: "Password and Confirm Password does not match.",
        buttons: [
          {
            label: "OK",
          },
        ],
      });
    } else {
      const endpoint = `http://localhost:8000/api/v1/users/register`;
      axios
        .post(endpoint, signUpInformation)

        .then((response) => {
          if (response.status === 201) {
            onSuccess();
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 409) {
            confirmAlert({
              title: "Error!",
              message: "User name or email already registered.",
              buttons: [
                {
                  label: "OK",
                },
              ],
            });
          }
        });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/6 flex flex-col justify-center items-center p-6 border rounded-[12px] shadow-md">
        <form action="post" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mr-auto mb-4">Sign Up</h2>
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <input
              onChange={getFirstName}
              type="firstName"
              required
              className="w-65 h-9.5 px-3 py-2  border border-gray-400 rounded-[12px]"
              placeholder="First Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Last Name</label>
            <input
              onChange={getLastName}
              type="lastName"
              required
              className="w-65 h-9.5 px-3 py-2  border border-gray-400 rounded-[12px]"
              placeholder="Last Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Display Name</label>
            <input
              onChange={getUserName}
              type="userName"
              required
              className="w-65 h-9.5 px-3 py-2  border border-gray-400 rounded-[12px]"
              placeholder="Dispaly Name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              onChange={getEmail}
              required
              className="w-65 h-9.5 px-3 py-2  border border-gray-400 rounded-[12px]"
              placeholder="Email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              onChange={getPassword}
              type="password"
              required
              className="w-65 h-9.5 px-3 py-2 border border-gray-400 rounded-[12px]"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Confirm Password</label>
            <input
              onChange={getConfirmPassword}
              type="password"
              required
              className="w-65 h-9.5 px-3 py-2 border border-gray-400 rounded-[12px]"
              placeholder="Confirm Password"
            />
          </div>
          <p className="text-xs mb-4">
            Passwords must contain at least eight characters, including at least
            1 letter and 1 number.
          </p>
          <button className="w-65 h-9.5 bg-white text-[#010536] hover:text-white py-2 border border-gray-400 rounded-[12px] hover:bg-[#010536]">
            Sign Up
          </button>
        </form>
        <div className="w-65 flex flex-col mt-4">
          <p className="text-xs mb-2">
            By clicking{" "}
            <a href="/" className="font-medium underline">
              “Sign up”
            </a>
            , you agree to our{" "}
            <a href="/" className="font-medium underline">
              terms of service
            </a>{" "}
            and acknowledge that you have read and understand our{" "}
            <a href="/" className="font-medium underline">
              privacy policy
            </a>{" "}
            and{" "}
            <a href="/" className="font-medium underline">
              code of conduct
            </a>
            .
          </p>
          <div>
            Already have an account?
            <span>
              <a href="/signin" className="font-medium ml-1">
                Sign in
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
