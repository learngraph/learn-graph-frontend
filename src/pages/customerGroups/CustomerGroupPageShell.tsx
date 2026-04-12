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
  const handleBackToBase = () => {
    navigate("/learn");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <main className="customer-page min-h-screen bg-section text-ink">
      <Navbar />

      <div className="pt-28">
        <CustomerGroupSelector current={currentGroup} />
      </div>

      <div className="customer-content">{children}</div>

      <div className="customer-back-to-base">
        <button type="button" className="customer-tile back" onClick={handleBackToBase}>
          ← {t("customers.general.backToBase")}
        </button>
      </div>
    </main>
  );
}
