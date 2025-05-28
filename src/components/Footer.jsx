import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faPaperPlane,
  faUsers,
  faHandshake,
  faBullseye
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const colors = {
    primary: "#1a73e8",
    primaryHover: "#1557b0",
    secondary: "#4285f4",
    accent: "#34a853",
    light: "#e8f0fe",
    dark: "#1a237e",
    darkBg: "#0f172a",
    grayBg: "#1e293b",
    cardBg: "#334155",
    textLight: "#ffffff",
    textMuted: "#94a3b8",
    gradientPrimary: "linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)",
    gradientAccent: "linear-gradient(135deg, #34a853 0%, #66bb6a 100%)"
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerSections = [
    {
      title: "Who We Are",
      icon: faUsers,
      links: [
        { name: "About YMP", url: "#" },
        { name: "Our Mission", url: "#" },
        { name: "Leadership Team", url: "#" },
        { name: "Partners", url: "#" },
        { name: "Contact Us", url: "#" }
      ]
    },
    {
      title: "Moving Together",
      icon: faHandshake,
      links: [
        { name: "Volunteers", url: "#" },
        { name: "Donation in Nature", url: "#" },
        { name: "Community Support", url: "#" },
        { name: "Corporate Partnership", url: "#" }
      ]
    },
    {
      title: "What We Do",
      icon: faBullseye,
      links: [
        { name: "Programs", url: "#" },
        { name: "Campaigns", url: "#" },
        { name: "Impact Reports", url: "#" },
        { name: "Success Stories", url: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: faFacebookF, url: '#', color: '#1877f2' },
    { name: 'Twitter', icon: faTwitter, url: '#', color: '#1da1f2' },
    { name: 'Instagram', icon: faInstagram, url: '#', color: '#e4405f' },
    { name: 'LinkedIn', icon: faLinkedinIn, url: '#', color: '#0077b5' },
    { name: 'YouTube', icon: faYoutube, url: '#', color: '#ff0000' }
  ];

  const contactInfo = [
    { icon: faPhone, text: "0852 - 1310 - 3997" },
    { icon: faEnvelope, text: "yukmariproject@gmail.com" },
    { icon: faMapMarkerAlt, text: "Bandung, Jawa Barat, Indonesia" }
  ];

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: colors.darkBg }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.primary} 2px, transparent 2px), radial-gradient(circle at 75% 75%, ${colors.accent} 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Newsletter */}
      <div className="relative py-16 border-b border-gray-700" style={{ background: `linear-gradient(135deg, ${colors.grayBg} 0%, ${colors.cardBg} 100%)` }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
              <FontAwesomeIcon icon={faPaperPlane} className="text-white text-2xl" />
              <span className="text-sm font-semibold text-white tracking-wider uppercase">Stay Connected</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-white leading-tight">Join Our Community</h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get the latest updates on our programs, impact stories, and opportunities to make a difference.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                style={{ background: colors.gradientPrimary }}
              >
                {isSubscribed ? (
                  <>
                    <span className="text-green-400">✓</span>
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-12 lg:gap-16">

            {/* Company Info */}
            <div className={`xl:col-span-2 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h3 className="text-3xl font-black mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">FundUnity CMS</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                Dedicated to helping individuals and organizations come together to fund and support important causes, creating lasting positive change in communities worldwide.
              </p>

              {/* Contact */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group cursor-pointer">
                    <FontAwesomeIcon icon={contact.icon} className="text-white text-xl" />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{contact.text}</span>
                  </div>
                ))}
              </div>

              {/* Google Maps */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-600">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.4104645402554!2d107.67505759999999!3d-6.9608114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c300070c60c1%3A0xddd74453cb6ef1a!2sPT.%20YUKMARI%20PROJECT%20INDONESIA!5e0!3m2!1sid!2sid!4v1740843636608!5m2!1sid!2sid"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Yuk Mari Project Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>

              <div className="text-center mt-4">
                <a
                  href="https://maps.app.goo.gl/7pdXU75EiCQLyc746"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold"
                >
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${(index + 1) * 200}ms` }}>
                <div className="flex items-center gap-3 mb-8">
                  <FontAwesomeIcon icon={section.icon} className="text-white text-xl" />
                  <h3 className="text-xl font-bold text-white">{section.title}</h3>
                </div>
                <ul className="space-y-4">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.url} className="group flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 py-2">
                        <div className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: colors.primary }}></div>
                        <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media */}
          <div className={`mt-16 pt-12 border-t border-gray-700 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-white mb-6">Connect With Us</h4>
              <div className="flex justify-center gap-4 flex-wrap">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="group w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all duration-300 border border-white/20 hover:border-white/40"
                    style={{ background: `linear-gradient(135deg, ${social.color}20, ${social.color}10)` }}
                  >
                    <FontAwesomeIcon icon={social.icon} className="text-white text-xl" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative py-8 text-center border-t border-gray-700" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
        <div className="container mx-auto px-6">
          <div className={`transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-gray-400 mb-4">© {new Date().getFullYear()} FundUnity CMS. All Rights Reserved.</p>
            <div className="flex justify-center gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
