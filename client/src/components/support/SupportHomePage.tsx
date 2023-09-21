import React from "react";
import ContactSupportForm from "../forms/ContactSupportForm";
import KnowledgeBaseSection from "./KnowledgeBaseSection";

function SupportHomePage() {
  return (
    <div className="min-h-full flex items-center justify-center my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md rounded-md p-6 w-full md:w-3/4 lg:w-1/2 xl:w-1/2">
        <ContactSupportForm />
        <KnowledgeBaseSection />
      </div>
    </div>
  );
}

export default SupportHomePage;
