import { Trans } from "react-i18next";
import { Href } from "@src/shared/Components";

export default function Hero() {
  const headerText = (
    <h2 className="flex flex-col text-[40px] sm:text-[60px] text-center text-white">
      <Trans
        i18nKey="landing.header"
        components={{
          strong: <strong className="text-primary-light" />,
        }}
      />
    </h2>
  );

  return (
    <div
      id="hero"
      className="flex flex-col lg:flex-row justify-center items-center w-fit h-fit mx-auto p-6 gap-4"
    >
      {/* Text Content on the Left */}
      <div className="lg:w-[50%] md:w-[70%] flex flex-col p-6 bg-black/70 rounded-2xl">
        <div className="text-left text-white">{headerText}</div>

        <p className="text-justify text-white font-bold text-[13px] sm:text-[17px] mt-2">
          <Trans
            i18nKey="landing.intro"
            components={{
              linktodiscord: (
                <Href
                  href="https://discord.gg/DatEV4kNp6"
                  className="text-blue-500 font-bold underline"
                />
              ),
            }}
          />
        </p>
      </div>

      {/* Image Content on the Right */}
      <div className="w-[90%] md:w-[80%] flex flex-col items-center gap-4">
        {/* Image */}
        <div
          id="image"
          className={`opacity-95 w-full max-w-[750px] aspect-video bg-[url('/trail.webp')] bg-no-repeat bg-cover bg-center rounded-2xl shadow-[0_0_12px_8px_rgba(156,204,252,0.7)] dark:shadow-[0_0_24px_12px_rgba(3,51,99,0.7)]`}
        />
      </div>
    </div>
  );
}
