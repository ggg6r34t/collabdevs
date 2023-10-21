import React, { useState } from "react";
import DOMPurify from "dompurify";

function ContactSupportForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState("Bug");
  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sanitizeInput = (input: string) => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [], // Remove all HTML tags
    });
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasErrors = false;

    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!sanitizedName) {
      newErrors.name = "Name is required";
      hasErrors = true;
    }

    if (!sanitizedEmail || !validateEmail(sanitizedEmail)) {
      newErrors.email = "Please enter a valid email address";
      hasErrors = true;
    }

    if (!sanitizedSubject) {
      newErrors.subject = "Subject is required";
      hasErrors = true;
    }

    if (!sanitizedMessage) {
      newErrors.message = "Message is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // if no errors, you can proceed to submit the form
    setErrors(newErrors);
    setSubmitted(true);

    // sending sanitized data to your server or perform other actions.
    // Remember to handle the server response and display a confirmation message.
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-blue-600 dark:text-blue-300 mb-6 text-center">
        Contact Support
      </h1>

      {submitted ? (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4 text-center">
          Thank you for reaching out! We'll get back to you shortly.
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-gray-100 dark:bg-slate-800 px-4 py-2 border border-gray-400 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="text-red-500 text-sm mt-2">{errors.name}</div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-gray-100 dark:bg-slate-800 px-4 py-2 border border-gray-400 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="text-red-500 text-sm mt-2">{errors.email}</div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full bg-gray-100 dark:bg-slate-800 px-4 py-2 border border-gray-400 rounded-md"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <div className="text-red-500 text-sm mt-2">{errors.subject}</div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full bg-gray-100 dark:bg-slate-800 px-4 py-2 border border-gray-400 rounded-md"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
              />
              <div className="text-red-500 text-sm mt-2">{errors.message}</div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="feedbackType"
                className="block text-sm font-medium mb-2"
              >
                Type of Feedback
              </label>
              <select
                id="feedbackType"
                className="w-full bg-gray-100 dark:bg-slate-800 px-4 py-2 border border-gray-400 rounded-md"
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
                required
              >
                <option value="Bug">Bug Report</option>
                <option value="FeatureRequest">Feature Request</option>
                <option value="General">General Inquiry</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#010536] text-white rounded-md focus:outline-none focus:ring focus:border border-gray-400-blue-400"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ContactSupportForm;
