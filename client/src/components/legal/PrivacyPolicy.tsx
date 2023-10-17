const privacyPolicyContent = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide during registration and while using CollabDev, including profile data and user-generated content.",
  },
  {
    title: "Use of Information",
    content:
      "We use your information to provide and improve our services, customize your experience, and communicate with you.",
  },
  {
    title: "Security",
    content:
      "We take reasonable measures to protect your information, but no online platform can guarantee absolute security.",
  },
  {
    title: "Cookies and Tracking Technologies",
    content:
      "We may use cookies and similar tracking technologies to enhance your browsing experience and collect data for analytics. You can manage your cookie preferences in your browser settings.",
  },
  {
    title: "Data Sharing and Third Parties",
    content:
      "We may share your information with third-party service providers to assist with our operations. These third parties are required to protect your information and use it solely for the purposes we specify.",
  },
  {
    title: "Your Choices and Control",
    content:
      "You have the right to access, correct, or delete your personal information. You can manage your preferences, including opting out of promotional communications.",
  },
  {
    title: "Children's Privacy",
    content:
      "CollabDev is not intended for users under the age of 13. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us to have it removed.",
  },
  {
    title: "Updates to Privacy Policy",
    content:
      "We may update our Privacy Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. We will notify you of any significant changes.",
  },
  {
    title: "Contact Us",
    content:
      "If you have questions or concerns about our Privacy Policy, please contact us at support@collabdev.com.",
  },
];

function PrivacyPolicy() {
  return (
    <div className="min-h-screen dark:bg-slate-900 p-6 mx-auto max-w-screen-xl mt-20">
      <h1 className="text-3xl font-semibold text-blue-600 dark:text-blue-300 mb-4">
        Privacy Policy
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        This Privacy Policy explains how we collect, use, and protect your
        personal information when you use CollabDev.
      </p>
      {privacyPolicyContent.map((item, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default PrivacyPolicy;
