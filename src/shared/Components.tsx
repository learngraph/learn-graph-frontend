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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Challenges
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {challengeBlocks.map((block, index) => (
            <div
              key={index}
              className="bg-orange-500/10 border border-softSilver p-6 rounded-lg shadow-2xl text-center hover:shadow-lg transition-shadow"
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
      className={`relative flex flex-col items-center cursor-pointer transition-all bg-blue-600 text-white drop-shadow-2xl hover:scale-105 ${
        isExpanded ? "w-64 h-64 rounded-2xl p-4" : "w-64 h-64 rounded-full"
      }`}
      onMouseEnter={(): void => setIsExpanded(true)}
      onMouseLeave={(): void => setIsExpanded(false)}
      onClick={(): void => setIsExpanded((prev: boolean): boolean => !prev)}
    >
      <div className="flex flex-col items-center justify-center text-center h-full">
        <div
          className={`text-2xl font-bold transition-all ${isExpanded ? "mb-2" : "mt-34"}`}
        >
          {insight.title}
        </div>
        <div
          className={`text-sm transition-opacity ${isExpanded ? "opacity-100" : "opacity-0"}`}
        >
          <p>{insight.description}</p>
          <a
            href={insight.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 underline mt-2 block"
          >
            {t("university.lm")}
          </a>
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
    <section className="py-12 bg-white/40">
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
    <section className="py-12 bg-white">
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
}

export const CTASection: FC<CTASectionProps> = ({ ctaBlocks, buttonColor: buttonColorInput }): JSX.Element => {
  const buttonColor = buttonColorInput ?? "bg-orange-300 text-gray-800"
  return (
    <section>
      {ctaBlocks.map((cta, index) => (
        <div
          key={index}
          className="flex items-center justify-center p-8 bg-white border border-softSilver rounded-lg shadow-2xl hover:scale-105 transition-scale duration-300 my-4 max-w-prose mx-auto"
        >
          <div className="text-3xl mr-4">{cta.symbol}</div>
          <div>
            <h3 className="text-2xl font-bold text-blue-800">{cta.headline}</h3>
            <p className="text-gray-700 max-w-prose mx-auto">{cta.text}</p>
            <button
              onClick={cta.onClick}
              className={`mt-4 px-4 py-2 font-semibold rounded hover:scale-110 transition-scale duration-300 border border-softSilver ${buttonColor} hover:bg-green-600/20`}
            >
              {cta.cta}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};
