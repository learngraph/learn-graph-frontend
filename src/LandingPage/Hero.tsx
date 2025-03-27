import { Trans } from "react-i18next";

export default function Hero() {
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
        <h2 className="text-[40px] sm:text-[60px] text-center text-white">
          <Trans
            i18nKey="landing.header"
            components={{
              strong: <strong className="text-primary-light" />,
            }}
          />
        </h2>
      </div>
    </div>
  );
}
