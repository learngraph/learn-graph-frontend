import { useEffect } from "react";
import { useI18n } from "@/i18n/i18n";

const RTL_LANGUAGES = new Set([
  "ar", // Arabic
  "he", // Hebrew (future-proof)
  "fa", // Persian (future-proof)
  "ur", // Urdu (future-proof)
]);

export default function DirectionController() {
  const { lang } = useI18n();

  useEffect(() => {
    const isRTL = RTL_LANGUAGES.has(lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [lang]);

  return null;
}
