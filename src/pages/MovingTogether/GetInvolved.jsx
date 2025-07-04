import React from "react";

export default function GetInvolved() {
  const actions = [
    {
      title: "Menjadi Relawan",
      desc: "Sumbangkan waktu dan keterampilan Anda untuk membuat perbedaan nyata dalam program kami.",
      bgColor: "bg-blue-600",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14v7" />
          <path d="M12 14L3 9" />
          <path d="M12 14l9-5" />
        </svg>
      ),
    },
    {
      title: "Donasi",
      desc: "Dukung kami secara finansial agar kami dapat terus menjalankan program-program yang berdampak.",
      bgColor: "bg-green-600",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 8v8" />
          <path d="M8 12h8" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      ),
    },
    {
      title: "Sebarkan Pesan",
      desc: "Bagikan misi kami kepada teman dan keluarga Anda untuk meningkatkan kesadaran.",
      bgColor: "bg-purple-600",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M22 12h-4l-3 9-4-18-3 9H2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-r from-purple-50 to-blue-50 min-h-screen flex flex-col justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-purple-900 mb-10 drop-shadow-sm">
          Cara Terlibat
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          {actions.map(({ title, desc, bgColor, icon }, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center p-6 rounded-xl shadow-lg text-white max-w-xs cursor-pointer transform hover:scale-105 transition-transform duration-300 ${bgColor}`}
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
