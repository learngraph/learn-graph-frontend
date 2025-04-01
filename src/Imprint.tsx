import React from "react";
import { NavigationWithContent } from "./Navigation";
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
  const content = (
    <div className="p-8 max-w-xl mx-auto my-8 bg-white bg-opacity-80 rounded-lg">
      <h1 className="text-3xl font-bold mb-4 mt-6">Impressum</h1>
      <hr className="mb-4" />

      {/* Angaben gemäß § 5 TMG */}
      <h2 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
      <p className="mb-2">
        {COMPANY_NAME}
        <br />
        {ADDRESS_LINE1}
        <br />
        {ZIP_CITY}
      </p>

      {/* Geschäftsführer */}
      <h2 className="text-xl font-semibold mb-2 mt-4">Geschäftsführer</h2>
      <p className="mb-2">{GESCHAEFTSFUEHRER.join(", ")}</p>

      {/* Kontakt */}
      <h2 className="text-xl font-semibold mb-2 mt-4">Kontakt</h2>
      <p className="mb-2">
        Telefon: {PHONE_NUMBER}
        <br />
        E-Mail:{" "}
        <a href={`mailto:${EMAIL}`} className="text-blue-600 underline">
          {EMAIL}
        </a>
      </p>

      {/* Handelsregister */}
      <h2 className="text-xl font-semibold mb-2 mt-4">Handelsregister</h2>
      <p className="mb-2">{HANDELSREGISTER}</p>

      {/* Umsatzsteuer-ID */}
      <h2 className="text-xl font-semibold mb-2 mt-4">Umsatzsteuer-ID</h2>
      <p className="mb-2">{VAT_ID}</p>

      {/* Verantwortlich für den Inhalt */}
      <h2 className="text-xl font-semibold mb-2 mt-4">
        Verantwortlich für den Inhalt
      </h2>
      <p className="mb-2">
        {COMPANY_NAME}
        <br />
        {ADDRESS_LINE1}, {ZIP_CITY}
      </p>

      {/* Haftungsausschluss */}
      <h2 className="text-xl font-semibold mb-2 mt-4">Haftungsausschluss</h2>
      <p className="mb-2">
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
        für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
        sind ausschließlich deren Betreiber verantwortlich.
        <br />
        <br />
        Die Inhalte dieser Seite wurden mit größtmöglicher Sorgfalt erstellt.
        Dennoch übernehmen wir keine Gewähr für die Richtigkeit, Vollständigkeit
        und Aktualität der bereitgestellten Informationen.
      </p>
    </div>
  );

  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/LGBG2.png')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent content={content} />
    </div>
  );
};

export const PrivacyPolicy = () => {
  const content = (
    <div className="p-8 max-w-xl mx-auto my-8 bg-white bg-opacity-80 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Datenschutzerklärung</h1>
      <hr className="mb-4" />
      <p className="mb-2">
        Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und
        Zweck der Verarbeitung personenbezogener Daten innerhalb unseres
        Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen und
        Inhalte.
      </p>
      <p className="mb-2">
        Wir nehmen den Schutz Ihrer Daten sehr ernst und behandeln Ihre
        personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
        Datenschutzvorschriften sowie dieser Datenschutzerklärung.
      </p>
    </div>
  );

  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/LGBG2.png')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent content={content} />
    </div>
  );
};

export const TermsOfUse = () => {
  const content = (
    <div className="p-8 max-w-xl mx-auto my-8 bg-white bg-opacity-80 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Nutzungsbedingungen</h1>
      <hr className="mb-4" />
      <p className="mb-2">
        Durch den Zugriff auf und die Nutzung dieser Website erklären Sie sich
        mit den folgenden Nutzungsbedingungen einverstanden. Bitte lesen Sie
        diese sorgfältig durch.
      </p>
      <p className="mb-2">
        Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt.
        Dennoch können wir keine Gewähr für die Aktualität, Richtigkeit und
        Vollständigkeit der Inhalte übernehmen.
      </p>
    </div>
  );

  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/LGBG2.png')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent content={content} />
    </div>
  );
};

export default Imprint;
