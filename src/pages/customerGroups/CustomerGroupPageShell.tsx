import "../styles/landing/landing.css";
import "../styles/customer/customer.css";

import { Navbar } from "../global/components/Navbar";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

import CustomerGroupSelector from "./CustomerGroupSwitchingTiles";

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

  return (
    <main className="customer-page min-h-screen bg-[var(--color-section-bg)] text-[var(--color-text-primary)]">
      <Navbar />

      {/* GROUP SELECTOR (replaces headline + bottom switch) */}
      <div className="pt-28">
        <CustomerGroupSelector current={currentGroup} />
      </div>

      {/* PAGE CONTENT */}
        {children}


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
