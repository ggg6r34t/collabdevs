import { ChangeEvent, useState } from "react";
import DOMPurify from "dompurify";

function FeedbackReportingForm() {
  const [feedback, setFeedback] = useState("");
  const [isReporting, setIsReporting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [error, setError] = useState("");

  const handleFeedbackChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value);
    setError(""); // Clear any previous error messages
  };

  const sanitizeInput = (input: string) => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [], // Remove all HTML tags
    });
  };

  const handleSubmitFeedback = () => {
    const sanitizedFeedback = sanitizeInput(feedback);

    // Check if the feedback is empty or too short
    if (!sanitizedFeedback || sanitizedFeedback.trim().length < 10) {
      setError("Please provide valid feedback (at least 10 characters).");
      return;
    }

    // Logic to send feedback/report to the server here
    setIsReporting(true);

    // Simulate an API request
    setTimeout(() => {
      setIsReporting(false);
      setFeedbackSent(true);
    }, 2000);
  };

  return (
    <div>
      <label
        htmlFor="Feedback & Report"
        className=" text-gray-600 dark:text-white block ml-2 mb-2"
      >
        Feedback & Report
      </label>
      {feedbackSent ? (
        <p className="text-green-500">Feedback sent successfully!</p>
      ) : (
        <>
          <textarea
            placeholder="Provide your feedback or report an issue..."
            value={feedback}
            onChange={handleFeedbackChange}
            rows={4}
            className="w-full mb-2 p-2 dark:bg-slate-700 border rounded-md"
          ></textarea>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleSubmitFeedback}
            disabled={isReporting}
            className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${
              isReporting ? "bg-gray-400" : "bg-[#010536] text-white"
            }`}
          >
            {isReporting ? "Sending..." : "Send Feedback"}
          </button>
        </>
      )}
    </div>
  );
}

export default FeedbackReportingForm;
