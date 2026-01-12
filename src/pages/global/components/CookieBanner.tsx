import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/i18n";
import {
  readConsent,
  writeConsent,
  hasAnalyticsConsent,
  subscribe,
} from "@/services/ConsentService";

export default function CookieBanner() {
  const { t } = useI18n();
  const [showBanner, setShowBanner] = useState(() => !readConsent());
  const [settingsOpen, setSettingsOpen] = useState(false);

  // snapshot at mount only; UI toggle stored separately
  const initialAnalytics = useMemo(() => hasAnalyticsConsent(), []);
  const [analyticsOn, setAnalyticsOn] = useState<boolean>(initialAnalytics);

  // Migrate legacy consent on first mount and subscribe to changes
  useEffect(() => {
    const current = readConsent();
    setShowBanner(!current);
    setAnalyticsOn(!!current?.categories.analytics);

    const unsub = subscribe((c) => {
      setShowBanner(!c);
      setAnalyticsOn(!!c?.categories.analytics);
    });
    return unsub;
  }, []);

  const acceptAll = useCallback(() => {
    writeConsent({ analytics: true });
    setSettingsOpen(false);
    setShowBanner(false);
  }, []);

  const rejectAll = useCallback(() => {
    writeConsent({ analytics: false });
    setSettingsOpen(false);
    setShowBanner(false);
  }, []);

  const saveSettings = useCallback(() => {
    writeConsent({ analytics: analyticsOn });
    setSettingsOpen(false);
    setShowBanner(false);
  }, [analyticsOn]);

  if (!showBanner && !settingsOpen) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-6"
      aria-live="polite"
    >
      <div
        className="w-[92%] max-w-3xl rounded-[var(--radius-card)] bg-[#0a2a45cc] backdrop-blur-xl border border-[color:rgba(126,200,255,0.5)] text-[var(--color-blue-100)] transition-all duration-300"
        role="dialog"
        aria-modal="true"
        aria-label={t("cookie.consentLabel")}
      >
        {showBanner && (
          <div className="px-6 py-6">
            <p className="mb-4">{t("cookie.description1")}</p>
            <p className="mb-6 text-sm opacity-80">{t("cookie.description2")}</p>
            <div className="flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => setSettingsOpen(true)}
                className="px-4 py-2 rounded-full border border-[var(--color-blue-300)] text-[var(--color-blue-100)] hover:bg-[var(--color-blue-300)]/20 transition"
              >
                {t("cookie.settings")}
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 rounded-full border border-[var(--color-blue-300)] text-[var(--color-blue-100)] hover:bg-[var(--color-blue-300)]/20 transition"
              >
                {t("cookie.rejectAll")}
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-full bg-[var(--color-blue-300)]/30 border border-[var(--color-blue-300)] hover:bg-[var(--color-blue-300)]/50 hover:border-[var(--color-blue-100)] text-[var(--color-blue-100)] font-semibold transition"
              >
                {t("cookie.acceptAll")}
              </button>
            </div>
          </div>
        )}

        {settingsOpen && (
          <div className="px-6 py-6 border-t border-[color:rgba(126,200,255,0.25)]">
            <h2 className="text-lg mb-4">{t("cookie.privacySettings")}</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 p-3 rounded-md bg-black/10">
                <div>
                  <div className="font-medium">
                    {t("cookie.strictlyNecessaryTitle")}
                  </div>
                  <div className="text-sm opacity-80">
                    {t("cookie.strictlyNecessaryDesc")}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked
                  readOnly
                  aria-label={t("cookie.strictlyNecessaryTitle")}
                />
              </div>

              <div className="flex items-start justify-between gap-4 p-3 rounded-md bg-black/10">
                <div>
                  <div className="font-medium">{t("cookie.analyticsTitle")}</div>
                  <div className="text-sm opacity-80">
                    {t("cookie.analyticsDesc")}
                  </div>
                </div>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={analyticsOn}
                    onChange={(e) => setAnalyticsOn(e.target.checked)}
                    aria-label={t("cookie.analyticsTitle")}
                  />
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSettingsOpen(false)}
                className="px-4 py-2 rounded-full border border-[var(--color-blue-300)] text-[var(--color-blue-100)] hover:bg-[var(--color-blue-300)]/20 transition"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={saveSettings}
                className="px-4 py-2 rounded-full bg-[var(--color-blue-300)]/30 border border-[var(--color-blue-300)] hover:bg-[var(--color-blue-300)]/50 hover:border-[var(--color-blue-100)] text-[var(--color-blue-100)] font-semibold transition"
              >
                {t("common.save")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


