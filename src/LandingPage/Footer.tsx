import { FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";
import Logo from "@src/logo";
import { useTranslation } from "react-i18next";

const handleIconClick = (url: string) => {
  window.open(url, "_blank");
};

export const SocialMediaIcons = () => {
  return (
    <>
      <FaLinkedin
        size={30}
        className="cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={() =>
          handleIconClick("https://www.linkedin.com/company/learngraph")
        }
      />
      <FaInstagram
        size={30}
        className="cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={() =>
          handleIconClick(
            "https://www.instagram.com/learngraph_org/?igsh=ZXNjeTRtYjNyOGd0",
          )
        }
      />
      <FaDiscord
        size={30}
        className="cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={() => handleIconClick("https://discord.com/invite/DatEV4kNp6")}
      />
    </>
  );
};

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#28343e] text-white text-center py-8 px-2 font-orbitron">
      {/* Project Name */}
      <Logo />
      <h5 className="text-xl font-bold mb-2 py-2">LEARNGRAPH</h5>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-5 py-4 mb-2">
        <SocialMediaIcons />
      </div>

      {/* Legal and Navigation Links */}
      <div className="mb-2">
        <p className="text-sm mb-2">
          {t("footer.copy", { year: new Date().getFullYear() })}
        </p>
        <a
          href="/imprint"
          className="text-sm text-white no-underline hover:underline mr-2"
        >
          {t("footer.imprint")}
        </a>
        <a
          href="/privacy-policy"
          className="text-sm text-white no-underline hover:underline mr-2"
        >
          {t("footer.privacyPolicy")}
        </a>
        <a
          href="/terms-of-use"
          className="text-sm text-white no-underline hover:underline"
        >
          {t("footer.termsOfUse")}
        </a>
      </div>
    </div>
  );
}
