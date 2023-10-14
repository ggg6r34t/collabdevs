import { Link, useParams } from "react-router-dom";

import useEmailConfirmation from "../../hooks/authentication/useEmailConfirmation";

function EmailConfirmation() {
  const { token } = useParams(); // get resetToken from the URL

  const message = useEmailConfirmation(token!);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 border rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-primary dark:text-secondary">
          Email Confirmation
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
          {message}
        </p>
        <div className="flex justify-center mt-6">
          <Link to="/">
            <button className="bg-[#010536] text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmation;
