import "../styles/customer/customer.css";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

type Group = "schools" | "labourMarket" | "individual";

type Props = {
  current: Group;
};

export default function CustomerGroupSwitchingTiles({ current }: Props) {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <section className="group-selector">
      {current === "schools" ? (
        <div className="group-tile active">{t("nav.schools")}</div>
      ) : (
        <button
          type="button"
          className="group-tile inactive"
          onClick={() => navigate("/schools")}
        >
          {t("nav.schools")}
        </button>
      )}

      {current === "labourMarket" ? (
        <div className="group-tile active">{t("nav.labourMarket")}</div>
      ) : (
        <button
          type="button"
          className="group-tile inactive"
          onClick={() => navigate("/labour-market")}
        >
          {t("nav.labourMarket")}
        </button>
      )}

      {current === "individual" ? (
        <div className="group-tile active">{t("nav.individual")}</div>
      ) : (
        <button
          type="button"
          className="group-tile inactive"
          onClick={() => navigate("/individual")}
        >
          {t("nav.individual")}
        </button>
      )}
    </section>
  );
}
