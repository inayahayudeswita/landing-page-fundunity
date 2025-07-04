import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFeedback({ type: "error", message: "Please fill all fields." });
      return;
    }

    setSending(true);
    setFeedback(null);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_g0lt91j",        // <-- ganti dengan service ID kamu
        "template_5lhs09c",        // <-- ganti dengan template ID kamu
        templateParams,
        "WYRA8lM5-2FWMeCTl"      // <-- ganti dengan user/public key kamu
      )
      .then(() => {
        setSending(false);
        setFeedback({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setSending(false);
        setFeedback({ type: "error", message: "Failed to send message. Try again." });
      });
  };

  return (
  <div className="pt-28 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-3xl font-semibold mb-6 text-blue-700 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <div className="px-3 text-blue-600">
            <FaUser />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
          <div className="px-3 text-blue-600">
            <FaEnvelope />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 outline-none"
            required
          />
        </div>

        {/* Message */}
        <textarea
          name="message"
          rows="5"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={sending}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:brightness-110 text-white font-semibold py-3 rounded-md transition"
        >
          {sending ? "Sending..." : <>
            <FaPaperPlane /> Send Message
          </>}
        </button>

        {/* Feedback */}
        {feedback && (
          <p
            className={`text-center mt-3 ${
              feedback.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback.message}
          </p>
        )}
      </form>
    </div>
  );
}
