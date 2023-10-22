import React, { useState } from "react";
import { useParams } from "react-router-dom";

import useChangePassword from "../../hooks/userManagement/useChangePassword";

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userId } = useParams(); // get userId from the URL

  const { message, changePassword } = useChangePassword(
    userId!,
    currentPassword,
    newPassword,
    confirmPassword
  );

  function getCurrentPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPassword(event.target.value);
  }

  function getNewPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setNewPassword(event.target.value);
  }

  function getConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[830px]">
      <div className="max-w-md w-full p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Change Password
        </h1>
        <form action="post" onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Current Password
            </label>
            <input
              id="password"
              onChange={getCurrentPassword}
              type="password"
              required
              placeholder="Current Password"
              autoComplete="current-password"
              className="w-full dark:bg-slate-800 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <input
              id="password"
              onChange={getNewPassword}
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
            onClick={changePassword}
            className="w-full bg-[#010536] text-white py-3 px-6 rounded-md transition duration-300 ease-in-out hover:bg-[#010324]"
          >
            Change Password
          </button>
        </form>
        <p className="mt-4 text-center text-lg text-gray-700">{message}</p>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
