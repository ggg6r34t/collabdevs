import { useState } from "react";
import { useParams } from "react-router-dom";

import { useResetPassword } from "../../hooks/passwordReset/useResetPassword";

function PasswordResetForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetToken } = useParams(); // get resetToken from the URL

  const { message, resetPassword } = useResetPassword(
    resetToken!,
    password,
    confirmPassword
  );

  function getPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function getConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="max-w-md w-full p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Password Reset
        </h1>
        <form action="post" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <input
              id="password"
              onChange={getPassword}
              type="password"
              required
              placeholder="New password"
              className="w-full dark:bg-slate-800 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              onChange={getConfirmPassword}
              type="password"
              required
              placeholder="Confirm New password"
              className="w-full dark:bg-slate-800 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            onClick={resetPassword}
            className="w-full bg-[#010536] text-white py-3 px-6 rounded-md transition duration-300 ease-in-out hover:bg-[#010324]"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-center text-lg text-gray-700">{message}</p>
      </div>
    </div>
  );
}

export default PasswordResetForm;
