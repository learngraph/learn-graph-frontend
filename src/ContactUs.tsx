import React, { useState } from "react";

import { NavigationWithContent } from "@src/Navigation";
import { SLACK_WEBHOOK_TOKEN } from "./constants";

const ContactUsComponent: React.FC = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-white mb-6 bg-black/60 p-5 rounded-2xl">
        Contact Us
      </h1>
      <div className="bg-white/90 bg-opacity-90 rounded-2xl p-8 max-w-2xl w-full text-center">
        <p className="text-lg mb-4">
          For inquiries, please email us at{" "}
          <a
            href="mailto:contact@learngraph.org"
            className="underline text-blue-600"
          >
            contact@learngraph.org
          </a>
          .
        </p>
        <p className="text-lg mb-4">
          If you'd like to reach out personally, visit our{" "}
          <a href="/about" className="underline text-blue-600">
            About Us
          </a>{" "}
          page.
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Please{" "}
            <a
              href="https://doodle.com/bp/laurin14/20min"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              click here
            </a>{" "}
            to book a demo.
          </h2>
        </div>
      </div>
    </>
  );
};

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for all fields
    if (
      !formData.name ||
      !(formData.email || formData.phone) ||
      !formData.message
    ) {
      setError("Please fill out all fields.");
      return;
    }

    const payload = {
      text: `New Contact Request:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}`,
    };

    try {
      const response = await fetch(
        `https://hooks.slack.com/services/${SLACK_WEBHOOK_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("There was an error sending your message. Please try again.");
      }
    } catch (_err) {
      setError("There was an error sending your message. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white bg-opacity-90 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
        <p>We've received your message and will be in touch soon.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 rounded-2xl p-8 shadow-2xl shadow-white"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 font-semibold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 font-semibold mb-2"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-gray-700 font-semibold mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={4}
          className="w-full p-2 border rounded"
          required
        ></textarea>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Send Message
      </button>
    </form>
  );
};

const ContactUs: React.FC = () => {
  return (
    <NavigationWithContent
      content={
        <>
          <div className="bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/LGBG2.png')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen flex flex-col items-center justify-center">
            <ContactUsComponent />
            {/*XXX: doesn't work yet <ContactForm />*/}
          </div>
        </>
      }
    />
  );
};

export default ContactUs;
