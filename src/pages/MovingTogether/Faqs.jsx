import React, { useState } from "react";

export default function FAQs() {
  const faqs = [
    {
      question: "Bagaimana cara saya memberikan donasi?",
      answer:
        "Anda dapat memberikan donasi melalui formulir donasi online yang tersedia di situs ini.",
    },
    {
      question: "Apakah saya bisa menjadi relawan meskipun tidak punya pengalaman?",
      answer:
        "Tentu saja! Kami menyambut relawan dari berbagai latar belakang dan akan memberikan panduan yang dibutuhkan.",
    },
    {
      question: "Apakah donasi saya bisa dikurangkan dari pajak?",
      answer:
        "Ya, semua donasi dapat dikurangkan dari pajak dan kami menyediakan bukti donasi bila diperlukan.",
    },
    {
      question: "Bagaimana cara saya menghubungi organisasi ini?",
      answer:
        "Anda dapat menghubungi kami melalui halaman Kontak atau melalui email di info@example.org.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✅ Tambahkan return di sini
  return (
    <section className="bg-gradient-to-tr from-white to-gray-100 min-h-screen px-4 sm:px-8 pt-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center drop-shadow-sm">
          Pertanyaan yang Sering Diajukan
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
                <span className="text-lg font-semibold text-gray-800">
                  {question}
                </span>
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
