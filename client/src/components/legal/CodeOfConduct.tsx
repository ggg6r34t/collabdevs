const conductSections = [
  {
    title: "Respectful Behavior",
    rules: [
      "Be respectful and considerate of others' ideas and opinions.",
      "Avoid any form of harassment, discrimination, or offensive behavior based on race, gender, religion, sexuality, etc.",
      "Do not engage in personal attacks, hate speech, or trolling.",
    ],
  },
  {
    title: "Content Guidelines",
    rules: [
      "Keep discussions and content relevant to programming, development, or the designated topics of our community.",
      "Avoid posting spam, advertisements, or any content that violates intellectual property rights.",
      "Do not share sensitive or private information about other members without their consent.",
    ],
  },
  {
    title: "Moderation and Reporting",
    rules: [
      "Failure to follow this code of conduct may result in moderation actions, including warnings, content removal, and account suspension.",
      "If you encounter behavior that violates the code of conduct, please report it to our moderation team.",
    ],
  },
  {
    title: "Feedback and Suggestions",
    rules: [
      "We encourage you to provide feedback and suggestions for improving our community. We are committed to making CollabDev a better place for all developers.",
    ],
  },
];

function CodeOfConduct() {
  return (
    <div className="min-h-screen dark:bg-slate-900 p-6 mx-auto max-w-screen-xl mt-20">
      <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-300 mb-6">
        CollabDev Code of Conduct
      </h2>
      {conductSections.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-400">
            {section.rules.map((rule, i) => (
              <li key={i} className="mb-2">
                {rule}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CodeOfConduct;
