export default function KnowledgeBaseSection() {
  return (
    <div>
      <div className="mt-14">
        <h2 className="text-xl font-semibold mb-4">Knowledge Base (FAQ)</h2>
        <p className="mb-4">
          Check our Knowledge Base for answers to common questions and issues.
        </p>
        <a href="/support/faq" className="text-blue-500 hover:underline">
          Explore FAQ
        </a>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          User Guides and Tutorials
        </h2>
        <p className="mb-4">
          Access user guides and tutorials for help with using our platform.
        </p>
        <a
          href="/support/user-guides"
          className="text-blue-500 hover:underline"
        >
          Browse Guides
        </a>
      </div>
    </div>
  );
}
