// Components/All.tsx
import { useState, FC, AnchorHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

export interface HrefProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Href: FC<HrefProps> = ({ className = "", ...props }) => {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-blue-600 hover:underline ${className}`}
    />
  );
};

/* ====================
   Type Declarations
   ==================== */
export interface ChallengeBlock {
  icon: string;
  headline: string;
  text: string;
}

export interface Insight {
  id: number;
  title: string;
  description: string;
  link: string;
}

export interface SolutionBlock {
  target: string;
  headline: string;
  imageUrl: string;
  keywords: string[];
  text: string;
  extraClass?: string;
}

export interface CTA {
  symbol: string;
  headline: string;
  text: string;
  cta: string;
  onClick: () => void;
}

/* ====================
   HeroSection Component
   ==================== */
export interface HeroSectionProps {
  headline: string;
  text: string;
  imageUrl: string;
  imageAlt: string;
}

export const HeroSection: FC<HeroSectionProps> = ({
  headline,
  text,
  imageUrl,
  imageAlt,
}): JSX.Element => {
  return (
    <section className="py-20 bg-white/40 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-800">
          {headline}
        </h1>
        <p className="text-xl mb-8 text-gray-700 max-w-prose mx-auto">{text}</p>
        <img
          src={imageUrl}
          alt={imageAlt}
          className="mx-auto my-8 rounded-3xl shadow-2xl lg:max-w-[30%] md:max-w-[45%] sm:max-w-[60%] max-w-[70%]"
        />
      </div>
    </section>
  );
};

/* ====================
   ChallengesSection Component
   ==================== */
export interface ChallengesSectionProps {
  challengeBlocks: ChallengeBlock[];
}

export const ChallengesSection: FC<ChallengesSectionProps> = ({
  challengeBlocks,
}): JSX.Element => {
  return (
    <section className="py-12 bg-black/10 backdrop-blur-xs">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Challenges
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {challengeBlocks.map((block, index) => (
            <div
              key={index}
              className="bg-white border border-softSilver p-6 rounded-2xl hover:shadow-2xl text-center shadow-lg transition-shadow hover:scale-105"
            >
              <div className="text-4xl mb-4">{block.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">
                {block.headline}
              </h3>
              <p className="text-gray-700">{block.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ====================
   InsightStat Component
   ==================== */
export interface InsightStatProps {
  insight: Insight;
}

export const InsightStat: FC<InsightStatProps> = ({ insight }): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <div
      className={`p-[4px] bg-gradient-to-l from-indigo-700 to-purple-700 ${
        isExpanded ? "w-66 h-66 rounded-2xl" : "w-66 h-66 rounded-full"
      }`}
    >
      <div
        className={`relative flex items-center justify-center cursor-pointer transition-all bg-white text-black ${
          isExpanded ? "w-64 h-64 rounded-2xl p-4" : "w-64 h-64 rounded-full"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="relative w-full h-full">
          {/* Centered Title */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-center transition-all duration-300 ${
              isExpanded
                ? "translate-y-[-80px] opacity-100"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div className="text-lg font-semibold">{insight.title}</div>
          </div>

          {/* Hidden/Shown Description */}
          <div
            className={`absolute top-5 left-0 w-full h-full flex flex-col items-center justify-center text-center p-4 transition-opacity ${
              isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-sm">{insight.description}</p>
            <a
              href={insight.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline mt-2 block text-sm"
            >
              {t("university.lm")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ====================
   InsightsSection Component
   ==================== */
export interface InsightsSectionProps {
  title: string;
  insights: Insight[];
  summary: string;
}

export const InsightsSection: FC<InsightsSectionProps> = ({
  title,
  insights,
  summary,
}): JSX.Element => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mb-4 bg-white border border-softSilver rounded-2xl p-4">
          {insights.map((insight) => (
            <InsightStat key={insight.id} insight={insight} />
          ))}
        </div>
        <p className="text-center text-lg italic bg-white border border-softSilver rounded-2xl p-2 text-gray-700 max-w-prose mx-auto">
          {summary}
        </p>
      </div>
    </section>
  );
};

/* ====================
   SolutionsSection Component
   ==================== */
export interface SolutionsSectionProps {
  title: string;
  solutionBlocks: SolutionBlock[];
}

export const SolutionsSection: FC<SolutionsSectionProps> = ({
  title,
  solutionBlocks,
}): JSX.Element => {
  return (
    <section className="py-12 bg-black/10 backdrop-blur-xs">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          {title}
        </h2>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {solutionBlocks.map((block, index) => (
            <div
              key={index}
              className="bg-white border border-softSilver p-6 rounded-lg shadow-2xl hover:scale-105 transition-scale duration-300"
            >
              <img
                src={block.imageUrl}
                alt={block.target}
                className={`w-full h-90 object-cover mb-4 rounded ${block.extraClass ?? ""}`}
              />
              <h3 className="text-xl font-semibold mb-2 text-blue-800">
                {block.headline}
              </h3>
              <p className="mb-4 text-gray-700">{block.text}</p>
              <div className="flex flex-wrap gap-2">
                {block.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-green-500/80 text-offWhite text-sm px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ====================
   CTASection Component
   ==================== */
export interface CTASectionProps {
  ctaBlocks: CTA[];
  buttonColor?: string;
  bgColor?: string;
  textColor?: string;
}

export const CTASection: FC<CTASectionProps> = ({
  ctaBlocks,
  buttonColor: buttonColorInput,
  bgColor: bgColorInput,
  textColor: textColorInput,
}): JSX.Element => {
  const buttonColor = buttonColorInput ?? "bg-green-500 text-gray-800";
  const bgColor = bgColorInput ?? "bg-black/60 backdrop-blur-md";
  const textColor = textColorInput ?? "text-white";
  return (
    <section>
      {ctaBlocks.map((cta, index) => (
        <div
          key={index}
          className={`flex items-center justify-center p-8 ${bgColor} border border-softSilver rounded-lg shadow-2xl hover:scale-105 transition-scale duration-300 my-4 max-w-prose mx-auto`}
        >
          <div className="text-3xl mr-4">{cta.symbol}</div>
          <div>
            <h3 className={`text-2xl font-bold ${textColor}`}>
              {cta.headline}
            </h3>
            <p className={`${textColor} max-w-prose mx-auto`}>{cta.text}</p>
            <button
              onClick={cta.onClick}
              className={`mt-4 px-4 py-2 font-semibold rounded hover:scale-110 transition-scale duration-300 border border-softSilver ${buttonColor} hover:bg-green-600`}
            >
              {cta.cta}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export interface Hotspot {
  id: number;
  label: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface HotspotImageOverlayProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  hotspots: Hotspot[];
}

export const HotspotImageOverlay: FC<HotspotImageOverlayProps> = ({
  imageSrc,
  imageAlt,
  title,
  hotspots,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <section className="py-12 px-4 backdrop-blur-xs bg-black/10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
        {title}
      </h2>

      <div className="relative mx-auto md:max-w-[84%] lg:max-w-4xl max-w-4xl">
        {/* Screenshot */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full rounded-2xl shadow-2xl shadow-black"
        />

        {/* Desktop arrows + labels */}
        <div className="hidden md:block">
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute"
              style={{
                top: spot.top,
                bottom: spot.bottom,
                left: spot.left,
                right: spot.right,
              }}
            >
              {/* Up‑pointing arrow */}
              <svg
                className="w-6 h-6 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19V5m0 0l-7 7m7-7l7 7"
                />
              </svg>

              {/* Label below arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[200px] text-center bg-blue-800 text-white text-lg px-3 py-1 rounded-2xl shadow-2xl">
                {spot.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile hotspots */}
        <div className="md:hidden">
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute"
              style={{
                top: spot.top,
                bottom: spot.bottom,
                left: spot.left,
                right: spot.right,
              }}
            >
              <button
                className="group bg-blue-800 text-xl border-2 border-black/20 text-white rounded-full w-10 h-10 flex items-center justify-center animate-bounce relative"
                onClick={() => setActiveHotspot(spot.id)}
              >
                ?{/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-[200px] text-center bg-blue-800 text-white text-sm px-2 py-1 rounded shadow-lg">
                  {spot.label}
                </div>
              </button>
            </div>
          ))}

          {/* Fullscreen modal */}
          {activeHotspot !== null && (
            <div
              className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 gap-2"
              onClick={() => setActiveHotspot(null)}
            >
              <div className="relative bg-blue-800 text-white rounded-2xl overflow-hidden max-w-prose text-center">
                <div className="p-4">
                  <p className="text-lg font-semibold">
                    {hotspots.find((h) => h.id === activeHotspot)?.label}
                  </p>
                </div>
              </div>

              {/* Red “X” close button */}
              <button
                className="text-xl py-2 px-4 rounded-2xl bg-red-600/80 hover:bg-red-600/90 transition-colors text-white"
                onClick={() => setActiveHotspot(null)}
              >
                X
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
