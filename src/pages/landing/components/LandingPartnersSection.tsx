import { useEffect, useState, useRef } from "react";
import { useI18n } from "@/i18n/i18n";
import { GlassCardStatic } from "./ui/GlassCardStatic";
import { partners, type Partner } from "../partnersData";

export default function LandingPartnersSection() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Number of partners visible based on screen size
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    if (isPaused || partners.length <= visibleCount) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (partners.length - visibleCount + 1));
    }, 4000); // Change slide every 4 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, visibleCount]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, partners.length - visibleCount + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, partners.length - visibleCount + 1)) % Math.max(1, partners.length - visibleCount + 1));
  };

  const handleTouchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    handleTouchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!handleTouchStart.current) return;

    const deltaX = e.changedTouches[0].clientX - handleTouchStart.current.x;
    const deltaY = e.changedTouches[0].clientY - handleTouchStart.current.y;

    // Only handle horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }

    handleTouchStart.current = null;
  };

  const maxIndex = Math.max(0, partners.length - visibleCount);

  return (
    <section
      id="partners"
      className="px-6 py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto w-full overflow-x-hidden">
        {/* Heading */}
        <h2 className="font-serif mb-10 leading-tight overflow-x-hidden">
          <span className="block text-foreground text-3xl tracking-wide break-words">
            {t("landing.LandingPartnersSection.title.prefix")}
          </span>
          <span className="block text-accent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight break-words">
            {t("landing.LandingPartnersSection.title.main")}
          </span>
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <PartnerCard partner={partner} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {partners.length > visibleCount && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--partner-arrow-bg)] backdrop-blur-md border border-foreground/20 hover:border-accent/60 hover:bg-[var(--partner-arrow-bg-hover)] transition-all flex items-center justify-center group"
                aria-label="Previous partners"
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
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[var(--partner-arrow-bg)] backdrop-blur-md border border-foreground/20 hover:border-accent/60 hover:bg-[var(--partner-arrow-bg-hover)] transition-all flex items-center justify-center group"
                aria-label="Next partners"
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

          {/* Dots Indicator */}
          {partners.length > visibleCount && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-accent w-8"
                      : "bg-foreground/30 hover:bg-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
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
