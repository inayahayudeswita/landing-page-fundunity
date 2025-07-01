import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone, faEnvelope, faMapMarkerAlt,
  faPaperPlane, faUsers, faHandshake, faBullseye
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram, faLinkedinIn
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

    const templateParams = {
      email,
    };

    emailjs.send(
      "service_g0lt91j",
      "template_5lhs09c",
      templateParams,
      "WYRA8lM5-2FWMeCTl"
    )
    .then(() => {
      setIsSubscribed(true);
      setFeedback("Thanks for subscribing!");
      setEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
        setFeedback('');
      }, 4000);
    })
    .catch(() => {
      setFeedback("Failed to subscribe. Try again.");
    });
  };

  const colors = {
    primary: "#1a73e8",
    accent: "#34a853",
    grayBg: "#1e293b",
    cardBg: "#334155",
    textLight: "#ffffff",
    gradientPrimary: "linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)",
  };

  const footerSections = [
    {
      title: "Who We Are",
      icon: faUsers,
      links: [
        { name: "About KRB", url: "/about" },
        { name: "Partners", url: "/partners" },
        { name: "Contact Us", url: "/contact" }
      ]
    },
    {
      title: "Moving Together",
      icon: faHandshake,
      links: [
        { name: "FAQs", url: "/faqs" },
        { name: "Get Involved", url: "/getinvolved" },
      ]
    },
    {
      title: "What We Do",
      icon: faBullseye,
      links: [
        { name: "Programs", url: "/program" },
        { name: "Focus Areas", url: "/focusareas" },
      ]
    }
  ];

  const contactInfo = [
    { icon: faPhone, text: "0852 - 1310 - 3997" },
    { icon: faEnvelope, text: "KomunitasRuangBeragi@gmail.com" },
    { icon: faMapMarkerAlt, text: "Bandung, Jawa Barat, Indonesia" }
  ];

  const socialLinks = [
    { name: "Instagram", icon: faInstagram, url: "#", color: "#e4405f" },
    { name: "LinkedIn", icon: faLinkedinIn, url: "#", color: "#0077b5" }
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0f172a] text-white">
      {/* Newsletter */}
      <div className="relative py-16 border-b border-gray-700 bg-gradient-to-br from-[#1e293b] to-[#334155]">
        <div className="container mx-auto px-4">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
              <FontAwesomeIcon icon={faPaperPlane} className="text-white text-2xl" />
              <span className="text-sm font-semibold text-white tracking-wider uppercase">Stay Connected</span>
            </div>
            <h2 className="text-4xl font-black mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest updates on our programs, impact stories, and opportunities to make a difference.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-2xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-400"
              >
                {isSubscribed ? "✓ Subscribed!" : "Subscribe"}
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
            Helping individuals and organizations fund and support impactful causes for a better world.
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
        <h4 className="text-xl font-semibold mb-6">Follow Us</h4>
        <div className="flex justify-center gap-5 mb-8">
          {socialLinks.map((social, idx) => (
            <a key={idx} href={social.url} className="text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition">
              <FontAwesomeIcon icon={social.icon} />
            </a>
          ))}
        </div>
        <p className="text-sm text-gray-500 mb-2">© {new Date().getFullYear()} Komunitas Ruang Berbagi. All rights reserved.</p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <a href="#">Privacy Policy</a>
          <span>|</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
