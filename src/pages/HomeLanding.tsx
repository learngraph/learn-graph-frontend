import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import { Navbar } from "@/pages/global/components/Navbar";

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

/** Two mirrored loops, pulled sideways off-screen as `progress` goes 0 → 1 (scroll-linked). */
function PullingLoopsGraphic({
  progress,
  ariaLabel,
  className = "",
}: {
  progress: number;
  ariaLabel: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const ga = `home-grad-a-${uid}`;
  const gb = `home-grad-b-${uid}`;
  const p = clamp01(progress);
  /* User-space units (viewBox 480 wide): enough travel to clear the frame */
  const pull = p * 280;
  const tensionY = -p * 4;

  return (
    <div className={className}>
      <svg
        viewBox="0 0 480 200"
        overflow="hidden"
        preserveAspectRatio="xMidYMid meet"
        className="mx-auto block h-auto w-full max-h-[min(52svh,480px)] text-accent/90"
        role="img"
      >
        <title>{ariaLabel}</title>
        <defs>
          <linearGradient id={ga} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--accent-rgb) / 0.15)" />
            <stop offset="100%" stopColor="rgb(var(--accent-rgb) / 0.55)" />
          </linearGradient>
          <linearGradient id={gb} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--accent-rgb) / 0.15)" />
            <stop offset="100%" stopColor="rgb(var(--accent-rgb) / 0.55)" />
          </linearGradient>
        </defs>

        <g transform={`translate(${-pull} ${tensionY})`}>
          <path
            fill="none"
            stroke={`url(#${ga})`}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 118 152 C 72 128 48 96 56 64 C 62 40 88 28 108 36 C 120 42 128 56 132 72 L 138 92 C 142 108 152 120 168 124 C 184 128 198 118 204 102 C 210 86 206 68 196 56 C 188 46 176 40 164 40"
          />
        </g>
        <g transform={`translate(${pull} ${tensionY})`}>
          <path
            fill="none"
            stroke={`url(#${gb})`}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M 362 152 C 408 128 432 96 424 64 C 418 40 392 28 372 36 C 360 42 352 56 348 72 L 342 92 C 338 108 328 120 312 124 C 296 128 282 118 276 102 C 270 86 274 68 284 56 C 292 46 304 40 316 40"
          />
        </g>
      </svg>
    </div>
  );
}

function PathCard({
  to,
  badge,
  title,
  body,
  cta,
  detailsHint,
  modalCloseLabel,
}: {
  to: string;
  badge: string;
  title: string;
  body: string;
  cta: string;
  detailsHint: string;
  modalCloseLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const onCardClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest("a[href], button")) return;
    setOpen(true);
  }, []);

  const onCardKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if ((e.target as HTMLElement).closest("a[href], button")) return;
    e.preventDefault();
    setOpen(true);
  }, []);

  const modal =
    open &&
    createPortal(
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
        role="presentation"
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
          aria-label={modalCloseLabel}
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="relative z-10 max-h-[min(85vh,720px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/15 bg-[#111] p-6 shadow-2xl sm:p-8"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="absolute right-3 top-3 rounded-full p-2 text-foreground/70 transition-colors hover:bg-white/10 hover:text-foreground"
            aria-label={modalCloseLabel}
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/90">{badge}</p>
          <h3 id={titleId} className="mt-3 pr-10 text-2xl font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p id={descId} className="mt-5 text-base leading-7 text-foreground/75">
            {body}
          </p>
          <Link
            to={to}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-onaccent transition-opacity hover:opacity-90 sm:w-auto"
            onClick={() => setOpen(false)}
          >
            {cta}
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <article
        className="group relative flex cursor-pointer flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] transition-[border-color,box-shadow,background-color] duration-300 hover:border-accent/40 hover:bg-white/[0.03] hover:shadow-[0_0_0_1px_rgb(var(--accent-rgb)/0.22)] focus-within:border-accent/40 focus-within:shadow-[0_0_0_1px_rgb(var(--accent-rgb)/0.22)] sm:p-10"
        aria-haspopup="dialog"
        onClick={onCardClick}
        onKeyDown={onCardKeyDown}
        tabIndex={0}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/90">{badge}</p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-xs text-foreground/45">{detailsHint}</p>
        <Link
          to={to}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-onaccent transition-opacity hover:opacity-90"
          onClick={(e) => e.stopPropagation()}
        >
          {cta}
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </article>
      {modal}
    </>
  );
}

export default function HomeLanding() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const [morphProgress, setMorphProgress] = useState(0);
  const [headlineOpacity, setHeadlineOpacity] = useState(1);
  useEffect(() => {
    const tick = () => {
      const sec = heroRef.current;
      const y = window.scrollY;
      const vh = window.innerHeight;

      if (!sec) {
        setMorphProgress(0);
        setHeadlineOpacity(1);
        return;
      }

      const top = sec.offsetTop;
      /* One-screen hero: morph tracks scroll over ~0.85 viewport after section top */
      const morphRange = vh * 0.85;
      setMorphProgress(clamp01((y - top) / Math.max(morphRange, 1)));

      const fadeLen = vh * 0.42;
      setHeadlineOpacity(1 - clamp01((y - top) / Math.max(fadeLen, 1)));
    };

    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick, { passive: true });
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-page text-ink">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-48 left-1/2 h-[min(90vh,800px)] w-[min(90vh,800px)] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <Navbar />

      <section
        ref={heroRef}
        className="relative z-[1] mx-auto flex min-h-[100svh] max-w-6xl flex-col px-4 pt-28 sm:px-6 lg:px-8 lg:pt-32"
      >
        <div className="flex min-h-0 w-full flex-1 flex-col pb-8 sm:pb-10">
          <div className="flex w-full min-w-0 flex-1 items-center justify-center overflow-x-visible pt-2">
            {/* Full-viewport width so strokes clip at screen edges, not at the content column */}
            <div className="pointer-events-none relative w-screen max-w-[100vw] shrink-0 ml-[calc(50%-50vw)]">
              <PullingLoopsGraphic
                progress={morphProgress}
                ariaLabel={t("home.illustrationAria")}
                className="w-full"
              />
            </div>
          </div>
          <h1
            className="mx-auto mt-4 max-w-3xl px-2 text-center text-[clamp(1.65rem,4.6vw,3.1rem)] font-semibold leading-[1.15] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.9),0_1px_2px_rgba(0,0,0,0.85)] sm:mt-6"
            style={{ opacity: headlineOpacity }}
          >
            {t("home.mission")}
          </h1>
        </div>
      </section>

      <div className="relative z-20 mx-auto max-w-6xl scroll-mt-24 px-4 pb-28 sm:px-6 lg:px-8 lg:pb-36">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground/85 sm:text-base">
            {t("home.pathsTitle")}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          <PathCard
            to="/learn"
            badge={t("home.platform.badge")}
            title={t("home.platform.title")}
            body={t("home.platform.body")}
            cta={t("home.platform.cta")}
            detailsHint={t("home.detailsHint")}
            modalCloseLabel={t("home.detailsModalClose")}
          />
          <PathCard
            to="/service"
            badge={t("home.studio.badge")}
            title={t("home.studio.title")}
            body={t("home.studio.body")}
            cta={t("home.studio.cta")}
            detailsHint={t("home.detailsHint")}
            modalCloseLabel={t("home.detailsModalClose")}
          />
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-center text-base leading-7 text-foreground/65 sm:mt-20 sm:text-lg sm:leading-8">
          {t("home.subline")}
        </p>
      </div>
    </main>
  );
}
