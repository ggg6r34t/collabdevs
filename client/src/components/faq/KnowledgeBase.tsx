import { useState } from "react";

function KnowledgeBase() {
  const [faqs, setFaqs] = useState([
    {
      question: "What is CollabDev?",
      answer:
        "CollabDev is a social media platform specifically designed for developers. It's a place where developers can connect, collaborate, and share their knowledge and projects with like-minded individuals in the developer community.",
      open: false,
    },
    {
      question: "How can I create an account on CollabDev?",
      answer:
        'To create an account on CollabDev, simply click on the "Sign Up" button on the homepage. You\'ll be prompted to provide some basic information, and then you can set up your profile.',
      open: false,
    },
    {
      question: "Is CollabDev free to use?",
      answer:
        "Yes, CollabDev is free to use. We offer a free plan that includes all the essential features for developers. However, we also offer premium plans with additional benefits for those who require extra features.",
      open: false,
    },
    {
      question:
        "Can I use CollabDev for personal projects or only for professional work?",
      answer:
        "You can use CollabDev for both personal and professional projects. It's a versatile platform designed to cater to developers at all levels, whether you're working on open-source projects, personal coding experiments, or professional collaborations.",
      open: false,
    },
    {
      question: "How do I connect with other developers on CollabDev?",
      answer:
        "You can connect with other developers by sending friend requests or following their profiles. You can also join or create developer groups, participate in discussions, and collaborate on projects.",
      open: false,
    },
    {
      question:
        "Are there privacy settings to control who sees my posts and profile?",
      answer:
        "Yes, CollabDev provides privacy settings that allow you to control who can see your posts and profile information. You can adjust these settings to maintain your desired level of privacy.",
      open: false,
    },
    {
      question: "Can I promote my open-source projects on CollabDev?",
      answer:
        "Absolutely! CollabDev encourages open-source collaboration. You can share your open-source projects, seek contributors, and engage with a community that appreciates and supports open-source initiatives.",
      open: false,
    },
    {
      question: "How do I report inappropriate content or users?",
      answer:
        "If you come across inappropriate content or users, please use the reporting feature available on the platform. Our moderation team will review the reports and take necessary action.",
      open: false,
    },
    {
      question: "Is CollabDev mobile-friendly?",
      answer:
        "Yes, CollabDev is designed to be mobile-friendly. You can access it through your web browser on your mobile device or download our mobile app for a smoother experience.",
      open: false,
    },
    {
      question:
        "How can I provide feedback or suggest new features for CollabDev?",
      answer:
        'We value your feedback! You can provide feedback and suggest new features by visiting our "Feedback" section or contacting our support team through the platform. We\'re always eager to improve and enhance the CollabDev experience based on user input.',
      open: false,
    },
    // Add more FAQs here
  ]);

  const toggleFaq = (index: number) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index].open = !updatedFaqs[index].open;
    setFaqs(updatedFaqs);
  };

  return (
    <div className="min-h-screen p-6 mx-auto max-w-screen-xl mt-20">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-300">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-slate-800 p-4 rounded-md shadow-md transition duration-300 transform hover:scale-105"
          >
            <div
              onClick={() => toggleFaq(index)}
              className="flex justify-between cursor-pointer hover:text-[#02084b] dark:hover:text-gray-400"
            >
              <div className="font-semibold">{faq.question}</div>
              <div
                className={`transition-transform transform ${
                  faq.open ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </div>
            </div>
            {faq.open && <p className="mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KnowledgeBase;
