import "../styles/customer/customer.css";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

type Group = "enterprise" | "university" | "individual";

type Props = {
  current: Group;
};

export default function CustomerGroupSelector({ current }: Props) {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <section className="group-selector">
      {/* Enterprise */}
      {current === "enterprise" ? (
        <div className="group-tile active">
          {t("nav.enterprise")}
        </div>
      ) : (
        <button
          className="group-tile inactive"
          onClick={() => navigate("/enterprise")}
        >
          {t("nav.enterprise")}
        </button>
      )}

      {/* University */}
      {current === "university" ? (
        <div className="group-tile active">
          {t("nav.university")}
        </div>
      ) : (
        <button
          className="group-tile inactive"
          onClick={() => navigate("/university")}
        >
          {t("nav.university")}
        </button>
      )}

      {/* Individual */}
      {current === "individual" ? (
        <div className="group-tile active">
          {t("nav.individual")}
        </div>
      ) : (
        <button
          className="group-tile inactive"
          onClick={() => navigate("/individual")}
        >
          {t("nav.individual")}
        </button>
      )}
    </section>
  );
}
