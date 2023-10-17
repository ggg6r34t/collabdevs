const termsAndConditions = [
  {
    title: "Account Registration",
    content:
      "You must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account and password.",
  },
  {
    title: "User Conduct",
    content:
      "Users must not engage in any activity that is harmful to CollabDev or its users, such as spam, harassment, or hacking.",
  },
  {
    title: "Content",
    content:
      "Users are responsible for the content they post on CollabDev. We reserve the right to remove any content that violates our guidelines.",
  },
  {
    title: "Privacy and Data Usage",
    content:
      "CollabDev is committed to protecting your privacy. We may collect and store personal data as outlined in our Privacy Policy. By using our services, you agree to our data collection and usage practices.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content provided on CollabDev, including text, images, and software, is protected by copyright and intellectual property laws. Users are prohibited from reproducing, distributing, or using any content from CollabDev without prior written consent from the owners or creators of such content.",
  },
  {
    title: "Termination of Accounts",
    content:
      "CollabDev reserves the right to terminate or suspend user accounts that violate these terms of service or engage in inappropriate conduct without prior notice. Users may also request account termination by contacting our support team.",
  },
  {
    title: "Disclaimers and Limitations of Liability",
    content:
      'CollabDev provides its services on an "as is" and "as available" basis. We do not guarantee the accuracy, reliability, or availability of our services. In no event shall CollabDev be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of our platform.',
  },
  {
    title: "Changes to Terms of Service",
    content:
      "CollabDev reserves the right to update or modify these terms of service at any time. Users will be notified of any changes, and continued use of our services after such notifications will constitute acceptance of the updated terms.",
  },
  {
    title: "Governing Law",
    content:
      "These terms of service are governed by and construed in accordance with the laws of [Our Jurisdiction]. Any disputes arising from or related to these terms will be subject to the exclusive jurisdiction of the courts in [Our Jurisdiction].",
  },
  {
    title: "Contact Information",
    content:
      "If you have any questions, concerns, or feedback regarding these terms of service, please contact us at support@collabdev.com.",
  },
];

function TermsOfService() {
  return (
    <div className="min-h-screen dark:bg-slate-900 p-6 mx-auto max-w-screen-xl mt-20">
      <h1 className="text-3xl font-semibold text-blue-600 dark:text-blue-300 mb-4">
        Terms of Service
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        By using CollabDev, you agree to abide by the following terms and
        conditions:
      </p>
      {termsAndConditions.map((item, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default TermsOfService;
