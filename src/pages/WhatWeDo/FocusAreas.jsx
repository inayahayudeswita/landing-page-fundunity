import React from "react";

export default function FokusUtama() {
  const bidang = [
    {
      title: "Pendidikan",
      description:
        "Memberikan pendidikan berkualitas untuk anak-anak kurang mampu agar mereka dapat mengembangkan potensinya.",
      icon: (
        <svg
          className="w-12 h-12 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 20l9-5-9-5-9 5 9 5z" />
          <path d="M12 12v8" />
          <path d="M12 12L3 7" />
          <path d="M12 12l9-5" />
        </svg>
      ),
    },
    {
      title: "Kesehatan",
      description:
        "Menyelenggarakan kampanye kesadaran kesehatan dan memberikan akses layanan kesehatan dasar.",
      icon: (
        <svg
          className="w-12 h-12 text-green-600"
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
      title: "Lingkungan",
      description:
        "Mendorong inisiatif untuk perlindungan lingkungan dan keberlanjutan.",
      icon: (
        <svg
          className="w-12 h-12 text-teal-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l4 7-4 7-4-7 4-7z" />
          <circle cx="12" cy="14" r="4" />
        </svg>
      ),
    },
    {
      title: "Komunitas",
      description:
        "Memberdayakan masyarakat melalui pengembangan keterampilan dan kolaborasi.",
      icon: (
        <svg
          className="w-12 h-12 text-purple-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="7" r="4" />
          <path d="M5 21v-2a4 4 0 0 1 8 0v2" />
          <path d="M17 21v-2a4 4 0 0 0-8 0v2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-br from-white to-blue-50 min-h-screen flex flex-col justify-center p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-12 drop-shadow-md">
          Fokus Utama Kami
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {bidang.map(({ title, description, icon }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-2xl duration-300 cursor-default"
            >
              <div className="mb-6">{icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
