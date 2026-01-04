import { CustomerNavbar } from "@/pages/global/components/CustomerNavbar";
import { useI18n } from "@/i18n/i18n";

export default function ImprintPage() {
  const { t } = useI18n();
  const hrb = t("legal.placeholder");

  const imprintDetails = [
    {
      label: t("legal.imprint.companyLabel"),
      value: "LearnGraph UG (Haftungsbeschränkt)",
    },
    {
      label: t("legal.imprint.managingDirectorLabel"),
      value: t("legal.imprint.managingDirectorValue"),
    },
    {
      label: t("legal.imprint.addressLabel"),
      value: "Gartenstr. 37\n44869 Bochum",
    },
    { label: t("legal.imprint.phoneLabel"), value: "+49 163 1925215" },
    { label: t("legal.imprint.emailLabel"), value: "contact@learngraph.org" },
    {
      label: t("legal.imprint.registerLabel"),
      value: t("legal.imprint.registerValue", { hrb }),
    },
    { label: t("legal.imprint.vatIdLabel"), value: "DE456745460" },
    { label: t("legal.imprint.taxNumberLabel"), value: "306/5858/1456" },
    { label: t("legal.imprint.companyNumberLabel"), value: "71852486" },
  ];

  return (
    <>
      <CustomerNavbar />
      <main className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)] pb-24 pt-24">
        <header className="max-w-4xl mx-auto px-6 pt-12 pb-12 border-b border-white/5">
          <p className="text-sm uppercase tracking-widest text-blue-400 font-bold mb-4">
            {t("legal.imprint.subtitle")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t("legal.imprint.title")}
          </h1>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
          <section className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <dl className="grid md:grid-cols-2 divide-y divide-x divide-white/5 border-white/5">
              {imprintDetails.map((item) => (
                <div
                  key={item.label}
                  className="p-8 flex flex-col space-y-2 border-white/5"
                >
                  <dt className="text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-semibold">
                    {item.label}
                  </dt>
                  <dd className="text-lg leading-relaxed whitespace-pre-line font-medium">
                    {item.label === t("legal.imprint.emailLabel") ? (
                      <a
                        className="underline underline-offset-4 hover:opacity-90"
                        href={`mailto:${item.value}`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="grid md:grid-cols-3 gap-12 pt-8">
            <div className="space-y-4">
              <h2 className="text-lg font-bold">
                {t("legal.imprint.responsibleTitle")}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line">
                LearnGraph UG (Haftungsbeschränkt)\nGartenstr. 37, 44869 Bochum
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-bold">
                {t("legal.imprint.disclaimerTitle")}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {t("legal.imprint.disclaimerBody")}
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-bold">
                {t("legal.imprint.accuracyTitle")}
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {t("legal.imprint.accuracyBody")}
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}


