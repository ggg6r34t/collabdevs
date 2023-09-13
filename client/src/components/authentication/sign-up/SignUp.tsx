import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

function SignUp() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/6 flex flex-col justify-center items-center p-6 border rounded-[12px] shadow-md">
        <button className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#DB4437] text-white py-2 border rounded-[12px] hover:bg-blue-200 mb-2">
          <FontAwesomeIcon
            icon={faGoogle}
            className="w-6 h-6 mr-2 rounded-full"
          />
          Sign up with Google
        </button>
        <button className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#181717] text-white py-2 border rounded-[12px] hover:bg-blue-200 mb-2">
          <FontAwesomeIcon
            icon={faGithub}
            className="w-6 h-6 mr-2 rounded-full"
          />
          Sign up with GitHub
        </button>
        <button className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#1877F2] text-white py-2 border rounded-[12px] hover:bg-blue-200 mb-3">
          <FontAwesomeIcon
            icon={faFacebook}
            className="w-6 h-6 mr-2 rounded-full"
          />
          Sign up with Facebook
        </button>
        <div className="w-65 h-9.5 flex flex-row items-center justify-center mb-3">
          <hr className="w-1/3 border border-black mr-4" /> Or{" "}
          <hr className="w-1/3 border border-black ml-4" />
        </div>
        <h2 className="text-2xl font-semibold mr-auto mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-2">Display Name</label>
          <input
            type="name"
            className="w-65 h-9.5 px-3 py-2  border border-gray-400 rounded-[12px]"
            placeholder="Dispaly Name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-65 h-9.5 px-3 py-2  border border-gray-400 rounded-[12px]"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-65 h-9.5 px-3 py-2 border border-gray-400 rounded-[12px]"
            placeholder="Password"
          />
        </div>
        <p className="text-xs mb-4">
          Passwords must contain at least eight characters, including at least 1
          letter and 1 number.
        </p>
        <button className="w-65 h-9.5 bg-white text-[#010536] hover:text-white py-2 border border-gray-400 rounded-[12px] hover:bg-[#010536]">
          Sign Up
        </button>
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
