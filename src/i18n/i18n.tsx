import { createContext, useContext, useMemo, useState, useEffect } from "react";
import type { ReactNode } from "react";

import en from "./locales/en.json";
import de from "./locales/de.json";
import el from "./locales/el.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import ar from "./locales/ar.json";

export type Lang = "en" | "de" | "el" | "fr" |"es" | "ar";

type Dict = Record<string, any>;

const dictionaries: Record<Lang, Dict> = { en, de, el, fr, es, ar };

function getInitialLang(): Lang {
  const saved = (typeof window !== "undefined" &&
    localStorage.getItem("lang")) as Lang | null;
  if (saved && dictionaries[saved]) return saved;
  const nav = (typeof navigator !== "undefined" && navigator.language) || "en";
  const base = nav.split("-")[0] as Lang;
  if (dictionaries[base]) return base;
  return "en";
}

function resolveKey(dict: Dict, key: string): any {
  return key
    .split(".")
    .reduce(
      (acc: any, part: string) =>
        acc && acc[part] != null ? acc[part] : undefined,
      dict,
    );
}

function interpolate(str: string, vars?: Record<string, any>): string {
  if (!vars) return str;
  return str.replace(/\{\{(.*?)\}\}/g, (_, k) => {
    const v = vars[k.trim()];
    return v == null ? "" : String(v);
  });
}

export interface I18nContextValue {
  lang: Lang;
  t: (key: string, vars?: Record<string, any>) => string;
  setLang: (l: Lang) => void;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang());

    useEffect(() => {
      try {
        localStorage.setItem("lang", lang);
      } catch {
        // Ignore localStorage errors (e.g., in private browsing mode)
      }
    }, [lang]);

  const t = useMemo(() => {
    const dict = dictionaries[lang] || dictionaries.en;
    const fallback = dictionaries.en;
    return (key: string, vars?: Record<string, any>) => {
      let val = resolveKey(dict, key);
      if (val == null) val = resolveKey(fallback, key);
      if (typeof val === "string") return interpolate(val, vars);
      return typeof val === "number" ? String(val) : key;
    };
  }, [lang]);

  const setLang = (l: Lang) => {
    if (dictionaries[l]) setLangState(l);
  };

  const value: I18nContextValue = {
    lang,
    t,
    setLang,
    dir: lang === "ar" ? "rtl" : "ltr",
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
