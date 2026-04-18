import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/i18n";
import { GlassCardStatic } from "./ui/GlassCardStatic";
import { partners, type Partner } from "../partnersData";

/** Time between automatic advances when idle */
const AUTO_SCROLL_MS = 4000;
/** After manual scroll / interaction, wait this long before auto-advance resumes */
const RESUME_AFTER_USER_MS = 9000;
/** Ignore scroll events while we drive smooth scroll programmatically (smooth scroll can outlast one frame) */
const PROGRAMMATIC_SCROLL_GUARD_MS = 1200;
/** Debounce end-of-scroll so we don’t reset the resume timer on every scroll tick */
const SCROLL_SETTLE_MS = 180;

export default function LandingPartnersSection() {
  const { t } = useI18n();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [showNav, setShowNav] = useState(false);

  const programmaticScrollRef = useRef(false);
  const advanceTimerRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const scrollSettleTimerRef = useRef<number | null>(null);

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current != null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current != null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const clearScrollSettle = useCallback(() => {
    if (scrollSettleTimerRef.current != null) {
      window.clearTimeout(scrollSettleTimerRef.current);
      scrollSettleTimerRef.current = null;
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    clearAdvanceTimer();
    clearResumeTimer();
    clearScrollSettle();
  }, [clearAdvanceTimer, clearResumeTimer, clearScrollSettle]);

  const getCardElements = useCallback((): HTMLElement[] => {
    const el = scrollerRef.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>("[data-partner-card]"));
  }, []);

  /** Advance one card forward from the current scroll position (wraps to start). */
  const advanceOne = useCallback(() => {
    const el = scrollerRef.current;
    const cards = getCardElements();
    if (!el || cards.length < 2) return;

    const sl = el.scrollLeft;
    let idx = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].offsetLeft <= sl + 2) idx = i;
    }
    const next = idx >= cards.length - 1 ? 0 : idx + 1;

    programmaticScrollRef.current = true;
    el.scrollTo({ left: cards[next].offsetLeft, behavior: "smooth" });
    window.setTimeout(() => {
      programmaticScrollRef.current = false;
    }, PROGRAMMATIC_SCROLL_GUARD_MS);
  }, [getCardElements]);

  /** Schedule repeating auto-advance from whatever position the scroller is at now. */
  const scheduleAdvanceLoop = useCallback(() => {
    clearAdvanceTimer();
    advanceTimerRef.current = window.setTimeout(() => {
      advanceTimerRef.current = null;
      advanceOne();
      scheduleAdvanceLoop();
    }, AUTO_SCROLL_MS);
  }, [advanceOne, clearAdvanceTimer]);

  /** User moved the carousel: stop auto-advance, then resume after delay from current position. */
  const pauseForUserInteraction = useCallback(() => {
    clearAdvanceTimer();
    clearResumeTimer();
    resumeTimerRef.current = window.setTimeout(() => {
      resumeTimerRef.current = null;
      scheduleAdvanceLoop();
    }, RESUME_AFTER_USER_MS);
  }, [clearAdvanceTimer, clearResumeTimer, scheduleAdvanceLoop]);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      setShowNav(el.scrollWidth > el.clientWidth + 1);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      const absY = Math.abs(e.deltaY);
      const absX = Math.abs(e.deltaX);
      if (absX > absY) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;
      const atStart = scrollLeft <= 1;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
      if ((e.deltaY < 0 && !atStart) || (e.deltaY > 0 && !atEnd)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
        pauseForUserInteraction();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [pauseForUserInteraction]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (programmaticScrollRef.current) return;
      clearScrollSettle();
      scrollSettleTimerRef.current = window.setTimeout(() => {
        scrollSettleTimerRef.current = null;
        pauseForUserInteraction();
      }, SCROLL_SETTLE_MS);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      clearScrollSettle();
    };
  }, [clearScrollSettle, pauseForUserInteraction]);

  /** Start / restart auto-scroll when the carousel becomes scrollable. */
  useEffect(() => {
    if (!showNav) {
      clearAllTimers();
      return;
    }
    scheduleAdvanceLoop();
    return () => clearAllTimers();
  }, [showNav, scheduleAdvanceLoop, clearAllTimers]);

  const scrollByStep = useCallback(
    (dir: -1 | 1) => {
      pauseForUserInteraction();
      const el = scrollerRef.current;
      const cards = getCardElements();
      if (!el || cards.length === 0) return;

      const sl = el.scrollLeft;
      let idx = 0;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].offsetLeft <= sl + 2) idx = i;
      }
      let next = idx + dir;
      if (next < 0) next = cards.length - 1;
      if (next >= cards.length) next = 0;

      programmaticScrollRef.current = true;
      el.scrollTo({ left: cards[next].offsetLeft, behavior: "smooth" });
      window.setTimeout(() => {
        programmaticScrollRef.current = false;
      }, PROGRAMMATIC_SCROLL_GUARD_MS);
    },
    [getCardElements, pauseForUserInteraction],
  );

  const onScrollerPointerDown = () => {
    pauseForUserInteraction();
  };

  return (
    <section id="partners" className="px-6 py-24">
      <div className="max-w-6xl mx-auto w-full min-w-0">
        {/* Heading */}
        <h2 className="font-serif mb-10 leading-tight overflow-clip">
          <span className="block text-foreground text-3xl tracking-wide break-words">
            {t("landing.LandingPartnersSection.title.prefix")}
          </span>
          <span className="block text-accent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight break-words">
            {t("landing.LandingPartnersSection.title.main")}
          </span>
        </h2>

        <div className="relative">
          <div
            ref={scrollerRef}
            onPointerDown={onScrollerPointerDown}
            className="
              flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth pb-2
              snap-x snap-mandatory touch-pan-x overscroll-x-contain
              [-ms-overflow-style:auto] [scrollbar-width:thin]
            "
          >
            {partners.map((partner) => (
              <div
                key={partner.id}
                data-partner-card
                className="flex-shrink-0 snap-start w-72 max-w-[calc(100vw-4rem)] sm:max-w-none sm:w-80"
              >
                <PartnerCard partner={partner} />
              </div>
            ))}
          </div>

          {showNav && (
            <>
              <button
                type="button"
                onClick={() => scrollByStep(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--partner-arrow-bg)] backdrop-blur-md border border-foreground/20 hover:border-accent/60 hover:bg-[var(--partner-arrow-bg-hover)] transition-all flex items-center justify-center group"
                aria-label="Scroll partners left"
              >
                <svg
                  className="w-6 h-6 text-foreground group-hover:text-accent transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByStep(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--partner-arrow-bg)] backdrop-blur-md border border-foreground/20 hover:border-accent/60 hover:bg-[var(--partner-arrow-bg-hover)] transition-all flex items-center justify-center group"
                aria-label="Scroll partners right"
              >
                <svg
                  className="w-6 h-6 text-foreground group-hover:text-accent transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <GlassCardStatic className="p-6 h-full flex flex-col items-center justify-between hover:border-accent/60 transition-all group">
      {/* Logo */}
      <div className="w-full h-32 mb-6 flex items-center justify-center bg-[var(--glass-surface)] rounded-lg p-4">
        <img
          src={partner.logoUrl}
          alt={`${partner.name} logo`}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center line-clamp-2 group-hover:text-accent transition-colors">
        {partner.name}
      </h3>

      {/* Website Link */}
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-accent/80 hover:text-accent underline underline-offset-2 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        Visit Website →
      </a>
    </GlassCardStatic>
  );
}
