import React, { useState } from "react";

import { useRequestPasswordReset } from "../../hooks/passwordReset/useRequestPasswordReset";

function PasswordResetRequest() {
  const [email, setEmail] = useState("");

  const { message, requestPasswordReset } = useRequestPasswordReset(email);

  function getEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Password Reset Request
        </h1>
        <div className="w-full">
          <input
            onChange={getEmail}
            type="email"
            required
            className="w-full dark:bg-slate-800 p-2 border rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your email"
          />
          <button
            onClick={requestPasswordReset}
            className="w-full bg-[#010536] text-white py-3 px-6 rounded-md transition duration-300 ease-in-out hover:bg-[#010536] hover:text-white"
          >
            Reset Password
          </button>
        </div>
        <p className="text-center text-lg mt-4 text-[#555]">{message}</p>
      </div>
    </div>
  );
}

export default PasswordResetRequest;
