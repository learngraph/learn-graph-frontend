import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

export default function LanguageSelector() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  const languages = ["EN", "DE", "EL", "ES", "AR"];

  return (
    <div className="lang-switcher">
  <button onClick={() => setOpen(!open)}>
    {lang.toUpperCase()}
    <ChevronDown size={14} />
  </button>

  {open && (
    <div className="lang-switcher-menu">
      {languages.map(l => (
        <button
          key={l}
          className={lang === l.toLowerCase() ? "active" : ""}
          onClick={() => {
            setLang(l.toLowerCase() as any);
            setOpen(false);
          }}
        >
          {l}
        </button>
      ))}
    </div>
  )}
</div>
  );
}

