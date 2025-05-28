import React, { useState } from "react";

export default function FAQs() {
  const faqs = [
    {
      question: "How can I make a donation?",
      answer:
        "You can donate through our online donation form accessible on this site.",
    },
    {
      question: "Can I volunteer even if I have no experience?",
      answer:
        "Absolutely! We welcome volunteers from all backgrounds and provide guidance.",
    },
    {
      question: "Are donations tax-deductible?",
      answer:
        "Yes, all donations are tax-deductible and we provide receipts upon request.",
    },
    {
      question: "How can I contact your organization?",
      answer:
        "You can reach us via the Contact page or email us at info@example.org.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-tr from-white to-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center drop-shadow-sm">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map(({ question, answer }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                aria-expanded={openIndex === idx}
              >
                <span className="text-lg font-semibold text-gray-800">{question}</span>
                <svg
                  className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 pb-6 text-gray-700 transition-max-height duration-500 ease-in-out overflow-hidden ${
                  openIndex === idx ? "max-h-96 pt-2" : "max-h-0"
                }`}
              >
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
