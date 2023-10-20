import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

import { RootState } from "../../redux/store";
import { BASE_URL } from "../../api/api";

function FeedbackForm() {
  const userInformation = useSelector(
    (state: RootState) => state.user.userInformation
  );

  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    feedback: "",
    isValid: true,
    isSubmitting: false, // flag to track if a submission is in progress
    error: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { feedback } = formState;

    if (feedback.trim() === "") {
      setFormState({ ...formState, isValid: false });
      return;
    }

    // prevent multiple submissions
    if (formState.isSubmitting) {
      return;
    }

    try {
      setFormState({ ...formState, isSubmitting: true });

      // sanitize the feedback using DOMPurify
      const sanitizedFeedback = DOMPurify.sanitize(feedback, {
        ALLOWED_TAGS: [], // remove all HTML tags
      });

      // submit feedback
      await submitFeedback(sanitizedFeedback);

      // reset form state on successful submission
      setFormState({
        feedback: "",
        isValid: true,
        isSubmitting: false,
        error: "",
      });
    } catch (error) {
      setFormState({
        ...formState,
        isSubmitting: false,
        error: "Error submitting feedback",
      });
    }
  };

  const submitFeedback = async (feedback: string) => {
    try {
      if (!userInformation) {
        setError("User information is missing.");
        return;
      }

      const { _id: userId, token } = userInformation;

      const feedbackData = {
        feedback,
        userId,
      };

      await axios.post(`${BASE_URL}/api/v1/feedback/`, feedbackData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Error submitting feedback. Please try again.");
      throw error; // rethrow the error to be caught in the handleSubmit catch block
    }
  };

  return (
    <div className="container max-w-xl min-h-[793px] mx-auto">
      <div className="my-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Give Feedback</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className={`w-full dark:bg-slate-800 px-3 py-2 border rounded-md focus:outline-none focus:ring ${
              formState.isValid ? "focus:border-blue-400" : "border-red-500"
            }`}
            rows={4}
            placeholder="Your feedback..."
            value={formState.feedback}
            onChange={(e) => {
              setFormState({
                ...formState,
                feedback: e.target.value,
                isValid: true,
              });
            }}
            onBlur={() => {
              if (formState.feedback.trim() === "") {
                setFormState({ ...formState, isValid: false });
              }
            }}
            required
          ></textarea>
          {!formState.isValid && (
            <p className="text-red-500 text-sm mt-2">
              Please provide valid feedback.
            </p>
          )}
          {formState.error && (
            <p className="text-red-500 text-sm mt-2">{formState.error}</p>
          )}
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-[#010536] text-white rounded-md focus:outline-none focus:ring focus:border-blue-400"
              type="submit"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default FeedbackForm;
