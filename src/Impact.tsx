import React from "react";
import { NavigationWithContent } from "./Navigation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SplitScreen } from "./shared/Components";

interface ImpactSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const ImgSustainableImpact = () => (
  <img
    src="/sustainable-impact.png"
    alt="Product & Revenue"
    className="w-32 h-32 object-cover rounded-2xl"
  />
);

const ImgFreeForever = () => (
  <img
    src="/free-forver.png"
    alt="Open-Source & Free"
    className="w-32 h-32 object-cover rounded-2xl"
  />
);

const ImpactSplitProfitVSNonProfit: React.FC = () => {
  const { t } = useTranslation();

  const splitScreenProps = {
    left: (
      <div className="flex flex-col items-center text-center space-y-4 backdrop-blur-2xl rounded-2xl p-6">
        <ImgSustainableImpact />
        <h2 className="text-2xl font-bold">
          {t("impact.product-sustainability")}
        </h2>
        <ul className="list-disc list-inside text-left space-y-2">
          <li>{t("impact.built-saas")}</li>
          <li>{t("impact.profits-reinvested")}</li>
          <li>{t("impact.no-paywalls")}</li>
        </ul>
      </div>
    ),

    right: (
      <div className="flex flex-col items-center text-center space-y-4 backdrop-blur-2xl rounded-2xl p-6">
        <ImgFreeForever />
        <h2 className="text-2xl font-bold">{t("impact.free-forever")}</h2>
        <ul className="list-disc list-inside text-left space-y-2">
          <li>{t("impact.no-logins")}</li>
          <li>{t("impact.production-grade")}</li>
          <li>{t("impact.trusted-communities")}</li>
        </ul>
      </div>
    ),

    leftExpanded: (
      <div className="space-y-6 max-w-prose rounded-2xl backdrop-blur-2xl p-6">
        <div className="flex flex-col items-center text-center">
          <ImgSustainableImpact />
        </div>
        <h2 className="text-3xl font-bold">{t("impact.fueling-mission")}</h2>
        <p>{t("impact.sustain-project")}</p>
        <ul className="list-disc list-inside space-y-2">
          <li>{t("impact.sell-platform")}</li>
          <li>{t("impact.free-for-individuals")}</li>
          <li>{t("impact.profit-into-impact")}</li>
        </ul>
      </div>
    ),

    rightExpanded: (
      <div className="space-y-6 max-w-prose rounded-2xl backdrop-blur-2xl p-6">
        <div className="flex flex-col items-center text-center">
          <ImgFreeForever />
        </div>
        <h2 className="text-3xl font-bold">{t("impact.open-access")}</h2>
        <p>{t("impact.infrastructure-hosted")}</p>
        <ul className="list-disc list-inside space-y-2">
          <li>{t("impact.handle-hosting")}</li>
          <li>{t("impact.features-free")}</li>
          <li>{t("impact.see-for-profit")}</li>
        </ul>
      </div>
    ),
  };

  return <SplitScreen {...splitScreenProps} />;
};

const ImpactStatBox: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="bg-white shadow-2xl rounded-2xl p-6 text-center">
    <div className="text-2xl font-bold text-blue-600 mb-2">{title}</div>
    <p className="text-gray-700">{description}</p>
  </div>
);

export const ImpactPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Sections data comes from i18n with keys defined in i18n.json.
  const sections: ImpactSection[] = [
    {
      id: "hero",
      title: t("impact.sections.hero.title"),
      content: (
        <>
          <p className="mb-4">{t("impact.sections.hero.content.paragraph1")}</p>
          <p>{t("impact.sections.hero.content.paragraph2")}</p>
        </>
      ),
    },
    {
      id: "alignment",
      title: t("impact.sections.alignment.title"),
      content: (
        <ul className="list-disc ml-5 space-y-2">
          {/** @ts-expect-error: object is an array */}
          {t("impact.sections.alignment.list", { returnObjects: true }).map(
            (item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ),
          )}
        </ul>
      ),
    },
    {
      id: "need",
      title: t("impact.sections.need.title"),
      content: (
        <ul className="list-disc ml-5 space-y-2">
          {/* @ts-expect-error: the translation returns a list of objects */}
          {t("impact.sections.need.list", { returnObjects: true }).map(
            (item: { strong: string; text: string }, index: number) => (
              <li key={index}>
                <strong>{item.strong}</strong> {item.text}
              </li>
            ),
          )}
        </ul>
      ),
    },
    {
      id: "solution",
      title: t("impact.sections.solution.title"),
      content: (
        <>
          <p className="mb-4">
            {t("impact.sections.solution.content.paragraph1")}
          </p>
          <p>{t("impact.sections.solution.content.paragraph2")}</p>
        </>
      ),
    },
    {
      id: "emergence",
      title: t("impact.sections.emergence.title"),
      content: (
        <>
          <p className="mb-4">
            {t("impact.sections.emergence.content.paragraph1")}
          </p>
          <p>{t("impact.sections.emergence.content.paragraph2")}</p>
        </>
      ),
    },
    {
      id: "impact-metrics",
      title: t("impact.sections.impactMetrics.title"),
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t("impact.sections.impactMetrics.stats", {
            returnObjects: true,
            // @ts-expect-error: the translation returns a list of objects
          }).map(
            (stat: { title: string; description: string }, index: number) => (
              <ImpactStatBox
                key={index}
                title={stat.title}
                description={stat.description}
              />
            ),
          )}
        </div>
      ),
    },
    {
      id: "impact-investors",
      title: t("impact.sections.impactInvestors.title"),
      content: (
        <div>
          <p className="mb-4">
            {t("impact.sections.impactInvestors.content.paragraph1")}
          </p>
          <ul className="list-disc ml-5 space-y-2">
            {t("impact.sections.impactInvestors.content.list", {
              returnObjects: true,
              // @ts-expect-error: the translation returns a list of objects
            }).map((item: { strong: string; text: string }, index: number) => (
              <li key={index}>
                <strong>{item.strong}</strong> {item.text}
              </li>
            ))}
          </ul>
          <p className="mt-6">
            {t("impact.sections.impactInvestors.content.paragraph2")}
          </p>
        </div>
      ),
    },
    {
      id: "final-vision",
      title: t("impact.sections.finalVision.title"),
      content: (
        <>
          <p className="mb-4">
            {t("impact.sections.finalVision.content.paragraph1")}
          </p>
          <p>{t("impact.sections.finalVision.content.paragraph2")}</p>
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-16 bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      {/* Hero section */}
      <section
        className="relative bg-cover bg-center py-24 px-6"
        style={{ backgroundImage: "url('/images/hero-evolution.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">{t("impact.hero.title")}</h1>
          <p className="text-2xl">{t("impact.hero.subtitle")}</p>
        </div>
      </section>
      <ImpactSplitProfitVSNonProfit />

      {/* Dynamic sections */}
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="max-w-4xl mx-auto px-6 backdrop-blur-md rounded-2xl p-6"
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            {section.title}
          </h2>
          <div className="text-lg leading-relaxed text-gray-700">
            {section.content}
          </div>
        </section>
      ))}

      {/* Call-to-action section */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{t("impact.cta.title")}</h2>
          <p className="text-lg mb-8">{t("impact.cta.subtitle")}</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-colors"
              onClick={() => navigate("/contact")}
            >
              {t("impact.cta.buttons.getInvolved")}
            </button>
            <button
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-2xl transition-colors"
              onClick={() => navigate("/contact")}
            >
              {t("impact.cta.buttons.investInImpact")}
            </button>
            <a
              href="https://drive.google.com/file/d/1_ZhbhKRd9Uh6hH1MC7ZTF5rPLxvTz4bB/view"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-blue-600 text-blue-600 font-bold py-4 px-10 rounded-2xl transition-colors hover:bg-blue-600 hover:text-white"
            >
              {t("impact.cta.buttons.readWhitepaper")}
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-6">{t("impact.cta.footer")}</p>
        </div>
      </section>
    </div>
  );
};

export const Impact = () => {
  return <NavigationWithContent content={<ImpactPage />} />;
};
