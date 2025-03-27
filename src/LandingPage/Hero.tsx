import React, { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

const totalAnimationFrames = 15;
const relativePagePositionToTransition = 1 / 2;

// A class to animate text scrambling
class TextScramble {
  el: HTMLElement;
  // The set of characters used for scrambling
  chars: string = "!<>-_\\/[]{}—=+*^?#________";
  frame: number = 0;
  frameRequest: number = 0;
  queue: Array<{
    from: string;
    to: string;
    start: number;
    end: number;
    char: string;
  }> = [];
  resolve: Function = () => {};

  constructor(el: HTMLElement) {
    this.el = el;
    this.update = this.update.bind(this);
  }

  // Increase the ranges for start/end to slow down the effect a bit.
  setText(newText: string) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * totalAnimationFrames);
      const end = start + Math.floor(Math.random() * totalAnimationFrames);
      this.queue.push({ from, to, start, end, char: "" });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

export default function Hero() {
  const { t } = useTranslation();
  const headerRef = useRef<HTMLHeadingElement>(null);
  // Track whether the scramble has switched to the "action" text.
  const [isAction, setIsAction] = useState(false);

  useEffect(() => {
    let scrollTimeout: number | undefined;

    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      // Debounce so we only act after scrolling has "stopped"
      scrollTimeout = window.setTimeout(() => {
        // Check if scroll position is past half the viewport height
        if (
          window.scrollY >
          window.innerHeight * relativePagePositionToTransition
        ) {
          if (!isAction && headerRef.current) {
            const scramble = new TextScramble(headerRef.current);
            scramble.setText(t("landing.headerAction"));
            setIsAction(true);
          }
        } else {
          if (isAction && headerRef.current) {
            const scramble = new TextScramble(headerRef.current);
            scramble.setText(t("landing.header"));
            setIsAction(false);
          }
        }
      }, 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAction, t]);

  return (
    <div>
      <div
        id="hero"
        className="flex flex-col items-center justify-start w-full h-screen overflow-hidden"
      >
        {/* Background image filling entire viewport height */}
        <div className="w-full flex-grow bg-[url('/trail.webp')] bg-cover bg-center" />
      </div>
      {/* Centered H2 header below the image */}
      <div className="w-full p-6 bg-black/70">
        <h2
          ref={headerRef}
          className="text-[40px] sm:text-[60px] text-center text-white"
        >
          {t("landing.header")}
        </h2>
      </div>
      {/* Optional CSS for scrambled (dud) characters */}
      <style>{`
        .dud {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
