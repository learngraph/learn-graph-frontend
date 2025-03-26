import { Box, Typography, Divider } from "@mui/material";
import { NavigationWithContent } from "./Navigation";
import Footer from "./LandingPage/Footer";

// Constant variables for legal and contact details
const COMPANY_NAME = "LearnGraph gUG (Haftungsbeschränkt)";
const ADDRESS_LINE1 = "Oskar-Hoffmannstr. 134";
const ZIP_CITY = "44789 Bochum";
const PHONE_NUMBER = "+491631925215";
const EMAIL = "contact@learngraph.org";
const GESCHAEFTSFUEHRER = ["Laurin Hagemann"];
const HANDELSREGISTER = "Handelsregister: Amtsgericht Bochum, HRB: TBD";
const VAT_ID = "Umsatzsteuer-Identifikationsnummer: TBD";

export const Imprint = () => {
  // The main content of the Impressum is wrapped in a Box with a semi-transparent background for readability.
  const content = (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "2rem auto",
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Impressum
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }} />

      {/* Angaben gemäß § 5 TMG */}
      <Typography variant="h6" gutterBottom>
        Angaben gemäß § 5 TMG
      </Typography>
      <Typography variant="body1" gutterBottom>
        {COMPANY_NAME}
        <br />
        {ADDRESS_LINE1}
        <br />
        {ZIP_CITY}
      </Typography>

      {/* Geschäftsführer */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: "1rem" }}>
        Geschäftsführer
      </Typography>
      <Typography variant="body1" gutterBottom>
        {GESCHAEFTSFUEHRER.join(", ")}
      </Typography>

      {/* Kontakt */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: "1rem" }}>
        Kontakt
      </Typography>
      <Typography variant="body1" gutterBottom>
        Telefon: {PHONE_NUMBER}
        <br />
        E-Mail:{" "}
        <a href={`mailto:${EMAIL}`} style={{ color: "inherit" }}>
          {EMAIL}
        </a>
      </Typography>

      {/* Handelsregister */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: "1rem" }}>
        Handelsregister
      </Typography>
      <Typography variant="body1" gutterBottom>
        {HANDELSREGISTER}
      </Typography>

      {/* Umsatzsteuer-ID */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: "1rem" }}>
        Umsatzsteuer-ID
      </Typography>
      <Typography variant="body1" gutterBottom>
        {VAT_ID}
      </Typography>

      {/* Verantwortlich für den Inhalt */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: "1rem" }}>
        Verantwortlich für den Inhalt
      </Typography>
      <Typography variant="body1" gutterBottom>
        {COMPANY_NAME}
        <br />
        {ADDRESS_LINE1}, {ZIP_CITY}
      </Typography>

      {/* Haftungsausschluss */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: "1rem" }}>
        Haftungsausschluss
      </Typography>
      <Typography variant="body1" gutterBottom>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
        für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
        sind ausschließlich deren Betreiber verantwortlich.
        <br />
        <br />
        Die Inhalte dieser Seite wurden mit größtmöglicher Sorgfalt erstellt.
        Dennoch übernehmen wir keine Gewähr für die Richtigkeit, Vollständigkeit
        und Aktualität der bereitgestellten Informationen.
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/LGBG2.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <NavigationWithContent content={content} />
      <Footer />
    </Box>
  );
};

export default Imprint;

export const PrivacyPolicy = () => {
  const content = (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "2rem auto",
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Datenschutzerklärung
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }} />
      <Typography variant="body1" gutterBottom>
        Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und
        Zweck der Verarbeitung personenbezogener Daten innerhalb unseres
        Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen und
        Inhalte.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Wir nehmen den Schutz Ihrer Daten sehr ernst und behandeln Ihre
        personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
        Datenschutzvorschriften sowie dieser Datenschutzerklärung.
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/LGBG2.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <NavigationWithContent content={content} />
      <Footer />
    </Box>
  );
};

export const TermsOfUse = () => {
  const content = (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "2rem auto",
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Nutzungsbedingungen
      </Typography>
      <Divider sx={{ marginBottom: "1rem" }} />
      <Typography variant="body1" gutterBottom>
        Durch den Zugriff auf und die Nutzung dieser Website erklären Sie sich
        mit den folgenden Nutzungsbedingungen einverstanden. Bitte lesen Sie
        diese sorgfältig durch.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt.
        Dennoch können wir keine Gewähr für die Aktualität, Richtigkeit und
        Vollständigkeit der Inhalte übernehmen.
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/LGBG2.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <NavigationWithContent content={content} />
      <Footer />
    </Box>
  );
};
