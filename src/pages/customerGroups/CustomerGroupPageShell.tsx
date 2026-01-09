import "../styles/landing/landing.css";
import "../styles/customer/customer.css";
import { Navbar } from "../global/components/Navbar";
import CustomerGroupTiles from "./CustomerGroupTiles";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

type CustomerGroup = "enterprise" | "university" | "individual";

type CustomerGroupPageShellProps = {
  children: React.ReactNode;
  currentGroup: CustomerGroup;
};

export default function CustomerGroupPageShell({
  children,
  currentGroup,
}: CustomerGroupPageShellProps) {
  const navigate = useNavigate();
  const { t } = useI18n();

  const groupLabel = {
    enterprise: t("nav.enterprise"),
    university: t("nav.university"),
    individual: t("nav.individual"),
  }[currentGroup];

  return (
    <main className="customer-page min-h-screen bg-[var(--color-section-bg)] text-[var(--color-text-primary)]">
      <Navbar />

      {/* CURRENT GROUP MARKER */}
      <div className="pt-24 pb-16 text-center ">
        <div className="customer-eyebrow text-white mb-4">
           {t("customers.general.for")}
        </div>
        <div
          className="text-4xl md:text-5xl font-serif tracking-wide"
          style={{ color: "var(--theme-green)" }}
        >
          {groupLabel}
        </div>
      </div>

      {/* PAGE CONTENT – UNTOUCHED */}
      <div className="pb-16">
        {children}
      </div>

      {/* SWITCH GROUPS */}

      <CustomerGroupTiles current={currentGroup} />

      {/* BACK TO BASE */}
      <div className="customer-back-to-base">
        <button
          className="customer-tile back"
          onClick={() => navigate("/")}
        >
          ← {t("customers.general.backToBase")}
        </button>
      </div>
    </main>
  );
}
