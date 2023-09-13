import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";

function SignIn() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/6 flex flex-col justify-center items-center p-6 border rounded-[12px] shadow-md">
        <button className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#DB4437] text-white py-2 border rounded-[12px] hover:bg-blue-200 mb-2">
          <FontAwesomeIcon
            icon={faGoogle}
            className="w-6 h-6 mr-2 rounded-full"
          />
          Sign in with Google
        </button>
        <button className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#181717] text-white py-2 border rounded-[12px] hover:bg-blue-200 mb-2">
          <FontAwesomeIcon
            icon={faGithub}
            className="w-6 h-6 mr-2 rounded-full"
          />
          Sign in with GitHub
        </button>
        <button className="w-65 h-9.5 flex flex-row items-center justify-center bg-[#1877F2] text-white py-2 border rounded-[12px] hover:bg-blue-200 mb-3">
          <FontAwesomeIcon
            icon={faFacebook}
            className="w-6 h-6 mr-2 rounded-full"
          />
          Sign in with Facebook
        </button>
        <div className="w-65 h-9.5 flex flex-row items-center justify-center mb-3">
          <hr className="w-1/3 border border-black mr-4" /> Or{" "}
          <hr className="w-1/3 border border-black ml-4" />
        </div>
        <h2 className="text-2xl font-semibold mr-auto mb-4">Sign In</h2>
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
        <button className="w-65 h-9.5 bg-white text-[#010536] hover:text-white py-2 border border-gray-400 rounded-[12px] hover:bg-[#010536]">
          Sign In
        </button>
        <div className="w-65 flex flex-col mt-4">
          <a href="/" className="font-medium">
            Forgot password?
          </a>
          <div>
            Don't have an account?
            <span>
              <a href="/signup" className="font-medium ml-1">
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
