import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone, faEnvelope, faMapMarkerAlt,
  faPaperPlane, faUsers, faHandshake, faBullseye
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram, faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) return;

    const templateParams = { email };

    emailjs.send(
      "service_g0lt91j",
      "template_5lhs09c",
      templateParams,
      "WYRA8lM5-2FWMeCTl"
    )
    .then(() => {
      setIsSubscribed(true);
      setFeedback("Terima kasih sudah berlangganan!");
      setEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
        setFeedback('');
      }, 4000);
    })
    .catch(() => {
      setFeedback("Gagal berlangganan. Silakan coba lagi.");
    });
  };

  const footerSections = [
    {
      title: "Siapa Kami",
      icon: faUsers,
      links: [
        { name: "Tentang KRB", url: "/about" },
        { name: "Mitra", url: "/partners" },
        { name: "Hubungi Kami", url: "/contact" }
      ]
    },
    {
      title: "Bergerak Bersama",
      icon: faHandshake,
      links: [
        { name: "FAQ", url: "/faqs" },
        { name: "Gabung Bersama Kami", url: "/getinvolved" },
      ]
    },
    {
      title: "Apa yang Kami Lakukan",
      icon: faBullseye,
      links: [
        { name: "Program", url: "/allprograms" },
        { name: "Fokus Utama", url: "/focusareas" },
      ]
    }
  ];

  const contactInfo = [
    { icon: faPhone, text: "0821 - 1677 - 1146" },
    { icon: faEnvelope, text: "komunitasruangberbagi@gmail.com" },
    { icon: faMapMarkerAlt, text: "Bandung, Jawa Barat, Indonesia" }
  ];

  const socialLinks = [
    { name: "Instagram", icon: faInstagram, url: "https://instagram.com/komunitasruangberbagi", color: "#e4405f" },
    { name: "WhatsApp Channel", icon: faWhatsapp, url: "https://whatsapp.com/channel/0029VazY3qSFXUuUlnV5VQ0q", color: "#25D366" }
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0f172a] text-white">
      {/* Newsletter */}
      <div className="relative py-16 border-b border-gray-700 bg-gradient-to-br from-[#1e293b] to-[#334155]">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
              <FontAwesomeIcon icon={faPaperPlane} className="text-white text-2xl" />
              <span className="text-sm font-semibold text-white tracking-wider uppercase">Tetap Terhubung</span>
            </div>
            <h2 className="text-4xl font-black mb-4">Bergabunglah Bersama Kami</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Dapatkan pembaruan terbaru seputar program, kisah inspiratif, dan kesempatan berkontribusi.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="w-full px-6 py-4 rounded-2xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-400"
              >
                {isSubscribed ? "✓ Terdaftar!" : "Berlangganan"}
              </button>
            </form>
            {feedback && <p className="mt-4 text-sm text-green-400">{feedback}</p>}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Komunitas Ruang Berbagi</h3>
          <p className="text-gray-400">
            Membantu individu dan organisasi mendukung berbagai aksi nyata demi dunia yang lebih baik.
          </p>
          {contactInfo.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-gray-300 hover:text-white transition">
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {/* Footer Sections */}
        {footerSections.map((section, index) => (
          <div key={index}>
            <h4 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <FontAwesomeIcon icon={section.icon} /> {section.title}
            </h4>
            <ul className="space-y-3 text-gray-400">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="hover:text-white transition">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Social Footer */}
      <div className="border-t border-gray-700 pt-10 text-center">
        <h4 className="text-xl font-semibold mb-6">Ikuti Kami</h4>
        <div className="flex justify-center gap-5 mb-8">
          {socialLinks.map((social, idx) => (
            <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
              <FontAwesomeIcon icon={social.icon} />
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-2">© {new Date().getFullYear()} Komunitas Ruang Berbagi. Semua hak dilindungi.</p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <a href="#">Kebijakan Privasi</a>
          <span>|</span>
          <a href="#">Syarat & Ketentuan</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
