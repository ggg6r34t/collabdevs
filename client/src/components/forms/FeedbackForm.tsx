import { useState } from "react";

type Props = {
  onSubmit: (feedback: string) => void;
};

function FeedbackForm({ onSubmit }: Props) {
  const [feedback, setFeedback] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim() === "") {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    onSubmit(feedback);
    setFeedback("");
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Give Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
            isValid ? "focus:border-blue-400" : "border-red-500"
          }`}
          rows={4}
          placeholder="Your feedback..."
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
            setIsValid(true);
          }}
          required
        ></textarea>
        {!isValid && (
          <p className="text-red-500 text-sm mt-2">
            Please provide valid feedback.
          </p>
        )}
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#010536] text-white rounded-md focus:outline-none focus:ring focus:border-blue-400"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
