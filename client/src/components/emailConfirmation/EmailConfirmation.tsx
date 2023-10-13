import useEmailConfirmation from "../../hooks/authentication/useEmailConfirmation";

function EmailConfirmation() {
  const message = useEmailConfirmation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Email Confirmation
        </h1>
        <p className="text-lg text-[#555] text-center">{message}</p>
      </div>
    </div>
  );
}

export default EmailConfirmation;
