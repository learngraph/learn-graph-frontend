import React, { useState, useEffect } from "react";
import { FaLinkedin, FaInstagram, FaDiscord, FaYoutube } from "react-icons/fa";
import { NavigationWithContent } from "@src/Navigation";

const ComingSoonComponent: React.FC = () => {
  // Target: 24.04.2025 12:00 GMT+1
  const targetDate = new Date("2025-04-24T12:00:00+01:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="bg-black text-white min-h-screen p-8 font-orbitron text-center">
      {/* Header Pulsating Image */}
      <div className="flex justify-center mb-8 mt-12">
        <img
          src="/learngraph-logo-no-background-on-black.png"
          alt="Exciting Preview"
          className="w-[60%] h-[60%] md:w-[40%] md:h-[40%] animate-pulse"
          style={{ animationDuration: "2s" }}
        />
      </div>

      {/* Hero Section */}
      <div className="mt-10 mb-8">
        <h1 className="text-4xl mt-4">Coming Soon</h1>
        <p className="text-xl mt-2">
          Launching in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </p>
      </div>

      {/* Subscription Section */}
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Stay Connected</h2>
        <div className="flex justify-center gap-6 text-4xl">
          <FaLinkedin
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/learngraph",
                "_blank",
              )
            }
          />
          <FaInstagram
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() =>
              window.open(
                "https://www.instagram.com/learngraph_org/?igsh=ZXNjeTRtYjNyOGd0",
                "_blank",
              )
            }
          />
          <FaYoutube
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() =>
              window.open(
                "https://www.youtube.com/channel/learngraph",
                "_blank",
              )
            }
          />
          <FaDiscord
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={() =>
              window.open("https://discord.com/invite/DatEV4kNp6", "_blank")
            }
          />
        </div>
      </div>

      {/* Get in Touch Section */}
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Get in Touch</h2>
        <p className="mb-2">
          Email us at{" "}
          <a href="mailto:contact@learngraph.org" className="underline">
            contact@learngraph.org
          </a>{" "}
          or visit our{" "}
          <a href="/about" className="underline">
            About
          </a>{" "}
          page.
        </p>
      </div>

      {/* Navigation Links Section */}
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Explore More</h2>
        <div className="flex flex-col items-center gap-2">
          <a href="/#roadmap" className="text-lg hover:underline">
            Our Roadmap
          </a>
          <a href="/#advisory-board" className="text-lg hover:underline">
            Advisory Board
          </a>
          <a href="/#faq" className="text-lg hover:underline">
            FAQ
          </a>
        </div>
      </div>

      {/* Visual Prototype Section */}
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Visual Prototype</h2>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {/* First Prototype */}
          <div className="relative w-[300px] h-[200px] overflow-hidden rounded-2xl">
            <img
              src="/screenshot_learngraph.png"
              alt="Visual Prototype 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-4 border-white rounded-2xl animate-pulse"></div>
          </div>
          {/* Arrow Indicator */}
          <div className="text-white text-4xl animate-bounce">&#8594;</div>
          {/* Second Prototype */}
          <div className="relative w-[300px] h-[200px] overflow-hidden rounded-2xl">
            <img
              src="/visual-prototype-beginning.png"
              alt="Visual Prototype 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-4 border-white rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Incentives for Sharing Section */}
      <div className="mb-8">
        <h2 className="text-3xl mb-4">Spread the Word & Support the Cause</h2>
        <p className="mb-2">
          Our product is soon ready for demo and we’re launching a non-profit
          initiative in Africa with{" "}
          <a className="underline" href="https://dbtechafrica.org/">
            DbTechAfrica
          </a>
          .
        </p>
        <p className="mb-4">
          Join our{" "}
          <a className="underline" href="https://discord.com/invite/DatEV4kNp6">
            Discord channel
          </a>{" "}
          to get involved and help support the cause!
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-md"
          onClick={() =>
            window.open("https://discord.com/invite/DatEV4kNp6", "_blank")
          }
        >
          Join Discord
        </button>
      </div>
    </div>
  );
};

const ComingSoon = () => {
  return <NavigationWithContent content={<ComingSoonComponent />} />;
};

export default ComingSoon;
