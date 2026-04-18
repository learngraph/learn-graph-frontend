import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import { Navbar } from "../global/components/Navbar";
import ScheduleCallButton from "../customerGroups/ScheduleCallButton";
const EMAIL_ADDRESS = "contact@learngraph.org";

type OfferKey = "clarity" | "automation" | "product";

type OfferContent = {
  title: string;
  summary: string;
  when: [string, string, string];
  youGet: [string, string, string];
  note: string;
};

function ServiceLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-page text-ink">
      <Navbar />

      <div className="px-4 pb-28 pt-28 sm:px-6 lg:px-8 lg:pb-36">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-24 lg:gap-32">
          {children}
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {intro ? (
          <p className="text-base leading-7 text-foreground/70 sm:text-lg">{intro}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm leading-6 text-foreground/80"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function getOfferContent(
  t: (key: string, vars?: Record<string, unknown>) => string,
  offerKey: OfferKey,
): OfferContent {
  switch (offerKey) {
    case "clarity":
      return {
        title: t("service.offers.clarity.title"),
        summary: t("service.offers.clarity.summary"),
        when: [
          t("service.offers.clarity.when.itemOne"),
          t("service.offers.clarity.when.itemTwo"),
          t("service.offers.clarity.when.itemThree"),
        ],
        youGet: [
          t("service.offers.clarity.youGet.itemOne"),
          t("service.offers.clarity.youGet.itemTwo"),
          t("service.offers.clarity.youGet.itemThree"),
        ],
        note: t("service.offers.clarity.note"),
      };
    case "automation":
      return {
        title: t("service.offers.automation.title"),
        summary: t("service.offers.automation.summary"),
        when: [
          t("service.offers.automation.when.itemOne"),
          t("service.offers.automation.when.itemTwo"),
          t("service.offers.automation.when.itemThree"),
        ],
        youGet: [
          t("service.offers.automation.youGet.itemOne"),
          t("service.offers.automation.youGet.itemTwo"),
          t("service.offers.automation.youGet.itemThree"),
        ],
        note: t("service.offers.automation.note"),
      };
    case "product":
      return {
        title: t("service.offers.product.title"),
        summary: t("service.offers.product.summary"),
        when: [
          t("service.offers.product.when.itemOne"),
          t("service.offers.product.when.itemTwo"),
          t("service.offers.product.when.itemThree"),
        ],
        youGet: [
          t("service.offers.product.youGet.itemOne"),
          t("service.offers.product.youGet.itemTwo"),
          t("service.offers.product.youGet.itemThree"),
        ],
        note: t("service.offers.product.note"),
      };
    default:
      throw new Error("Unknown offer key");
  }
}

function OfferCard({
  offerKey,
  open,
  onToggle,
}: {
  offerKey: OfferKey;
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();
  const content = getOfferContent(t, offerKey);

  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-6 text-left"
        aria-expanded={open}
      >
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent">
              {t("service.offers.shared.includedLabel")}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              {content.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              {content.summary}
            </p>
          </div>
        </div>

        <span className="rounded-full border border-white/10 p-3 text-foreground/70">
          <ChevronDown
            className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {open ? (
        <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">
              {t("service.offers.shared.whenTitle")}
            </h4>
            <BulletList items={content.when} />
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">
              {t("service.offers.shared.youGetTitle")}
            </h4>
            <BulletList items={content.youGet} />
          </div>

          <div className="lg:col-span-2">
            <p className="rounded-2xl border border-accent/25 bg-accent/10 px-5 py-4 text-sm leading-6 text-foreground/80">
              {content.note}
            </p>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function ServiceOverviewPage() {
  const { t } = useI18n();
  const [openOffer, setOpenOffer] = useState<OfferKey | null>("clarity");

  return (
    <ServiceLayout>
      <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(212,255,57,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.28em] text-accent/80">
            {t("service.hero.eyebrow")}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("service.hero.title")}
          </h1>
          <p className="text-base leading-7 text-foreground/72 sm:text-lg">
            {t("service.hero.body")}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <span className="rounded-full border border-accent/35 bg-accent/10 px-4 py-2 text-sm text-accent">
            {t("service.hero.chipOne")}
          </span>
          <span className="rounded-full border border-accent/35 bg-accent/10 px-4 py-2 text-sm text-accent">
            {t("service.hero.chipTwo")}
          </span>
          <span className="rounded-full border border-accent/35 bg-accent/10 px-4 py-2 text-sm text-accent">
            {t("service.hero.chipThree")}
          </span>
        </div>

        <div className="mt-10">
          <ScheduleCallButton />
        </div>
      </section>

      <Section title={t("service.pressure.title")} intro={t("service.pressure.intro")}>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6">
            <p className="text-lg font-semibold text-white">
              {t("service.pressure.cards.one.title")}
            </p>
            <p className="mt-4 text-sm leading-6 text-foreground/75">
              {t("service.pressure.cards.one.body")}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6">
            <p className="text-lg font-semibold text-white">
              {t("service.pressure.cards.two.title")}
            </p>
            <p className="mt-4 text-sm leading-6 text-foreground/75">
              {t("service.pressure.cards.two.body")}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6">
            <p className="text-lg font-semibold text-white">
              {t("service.pressure.cards.three.title")}
            </p>
            <p className="mt-4 text-sm leading-6 text-foreground/75">
              {t("service.pressure.cards.three.body")}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6">
            <p className="text-lg font-semibold text-white">
              {t("service.pressure.cards.four.title")}
            </p>
            <p className="mt-4 text-sm leading-6 text-foreground/75">
              {t("service.pressure.cards.four.body")}
            </p>
          </div>
        </div>
      </Section>

      <section className="rounded-[2rem] border border-accent/25 bg-accent/10 px-6 py-8 sm:px-8 sm:py-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-accent/80">
            {t("service.compliance.eyebrow")}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t("service.compliance.title")}
          </h2>
          <p className="text-base leading-7 text-foreground/75 sm:text-lg">
            {t("service.compliance.body")}
          </p>
        </div>
      </section>

      <Section title={t("service.trust.title")} intro={t("service.trust.intro")}>
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6">
            <p className="text-lg font-semibold text-white">
              {t("service.trust.cards.one.title")}
            </p>
            <p className="mt-4 text-sm leading-6 text-foreground/75">
              {t("service.trust.cards.one.body")}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6">
            <p className="text-lg font-semibold text-white">
              {t("service.trust.cards.two.title")}
            </p>
            <p className="mt-4 text-sm leading-6 text-foreground/75">
              {t("service.trust.cards.two.body")}
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-6">
            <p className="text-lg font-semibold text-white">
              {t("service.trust.cards.three.title")}
            </p>
            <p className="mt-4 text-sm leading-6 text-foreground/75">
              {t("service.trust.cards.three.body")}
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-accent/25 bg-accent/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">
              {t("service.trust.proofOne.label")}
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              {t("service.trust.proofOne.title")}
            </h3>
            <p className="mt-4 text-sm leading-6 text-foreground/75">
              {t("service.trust.proofOne.body")}
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-accent/25 bg-accent/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent/80">
              {t("service.trust.proofTwo.label")}
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              {t("service.trust.proofTwo.title")}
            </h3>
            <p className="mt-4 text-sm leading-6 text-foreground/75">
              {t("service.trust.proofTwo.body")}
            </p>
          </div>
        </div>
      </Section>

      <Section title={t("service.offers.title")} intro={t("service.offers.intro")}>
        <div id="offers" className="space-y-5">
          <OfferCard
            offerKey="clarity"
            open={openOffer === "clarity"}
            onToggle={() => setOpenOffer((current) => (current === "clarity" ? null : "clarity"))}
          />
          <OfferCard
            offerKey="automation"
            open={openOffer === "automation"}
            onToggle={() =>
              setOpenOffer((current) => (current === "automation" ? null : "automation"))
            }
          />
          <OfferCard
            offerKey="product"
            open={openOffer === "product"}
            onToggle={() => setOpenOffer((current) => (current === "product" ? null : "product"))}
          />
        </div>
      </Section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.02] px-6 py-10 sm:px-8 sm:py-12">
        <div className="max-w-3xl space-y-5">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t("service.contact.title")}
          </h2>
          <p className="text-base leading-7 text-foreground/75 sm:text-lg">
            {t("service.contact.body")}
          </p>
          <div className="pt-2">
            <ScheduleCallButton />
          </div>
          <p className="text-sm leading-6 text-foreground/65">
            {t("service.contact.emailPrefix")}{" "}
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="text-foreground/80 underline underline-offset-4 hover:text-white"
            >
              {EMAIL_ADDRESS}
            </a>
          </p>
        </div>
      </section>
    </ServiceLayout>
  );
}
