import { Trans, useTranslation } from "react-i18next";
import { NavigationWithContent } from "./Navigation";
import { Handshake } from "@mui/icons-material";
import TeamSlider from "./MemberCard";
import Footer from "./LandingPage/Footer";

export const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <NavigationWithContent
        content={
          <main
            className="min-h-screen flex flex-col bg-fixed bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/LGBG2.png)",
            }}
          >
            {/* Origin Story */}
            <div className="flex lg:flex-row flex-col xs:flex-row justify-center items-center my-10 mx-10 gap-6 px-4 ">
              <div className="flex-1 bg-black/50 p-6 rounded-xl backdrop-blur-md max-w-prose">
                <h1
                  className="text-3xl font-bold text-white mb-4 max-w-prose"
                  id="about"
                >
                  {t("about.Storyh")}
                </h1>
                <p className="text-white text-justify font-semibold text-base max-w-prose">
                  <Trans i18nKey="about.Storyp" />
                </p>
              </div>
              <div className="opacity-90 w-[80%] lg:w-[40%] aspect-video bg-no-repeat bg-cover bg-center rounded-2xl shadow-[0_0_12px_8px_rgba(156,204,252,0.7)] dark:shadow-[0_0_24px_12px_rgba(3,51,99,0.7)] bg-[url('/Inno.png')]"></div>
            </div>

            {/* Team Presentation */}
            <section className="flex flex-col items-center px-4">
              <div className="bg-black/60 rounded-2xl shadow-md p-6">
                <h2
                  className="text-3xl font-bold text-white mb-4 text-center"
                  id="whoarewe"
                >
                  {t("about.Our-Team")}
                </h2>
                <p className="text-white text-center font-semibold">
                  {t("about.Our-Team-text")}
                </p>
              </div>

              <div className="mt-26"></div>
              <TeamSlider />
            </section>

            <section className="flex flex-col items-center my-16 px-4">
              <div className="bg-black/70 rounded-2xl shadow-md w-[40%] p-6">
                <h2
                  className="text-3xl font-bold text-white text-center"
                  id="travelgroup"
                >
                  {t("about.headline-travel-group")}
                </h2>
              </div>

              <div className="relative mt-28 max-w-xl w-full bg-gradient-to-br from-gray-300/40 to-gray-400/30 p-6 rounded-xl shadow-xl border-t-4 border-blue-500 backdrop-blur-md text-center">
                <img
                  src="team-placeholder.png"
                  alt="Team Placeholder"
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
                />

                <div className="mt-20">
                  <a
                    href="mailto:jobs@learngraph.org"
                    className="inline-flex items-center justify-center"
                  >
                    <Handshake className="text-white w-9 h-9" />
                  </a>
                  <p className="text-white italic mt-4 text-justify">
                    <Trans
                      i18nKey="about.team-placeholder-description"
                      components={{
                        discord: (
                          <a
                            href="https://discord.gg/DatEV4kNp6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          />
                        ),
                        email: (
                          <a
                            href="mailto:jobs@learngraph.org"
                            className="underline"
                          />
                        ),
                      }}
                    />
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-gray-300 my-8 mx-4" />
          </main>
        }
      />

      <Footer />
    </div>
  );
};
