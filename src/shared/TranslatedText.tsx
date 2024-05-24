import { Autocomplete, Box } from "@mui/material";
import { useState } from "react";
import { LanguageSelect } from "@src/GraphManager/LanguageSelect";
import { useUserDataContext } from "@src/Context/UserDataContext";

export const TranslatedText = () => {
  const { language } = useUserDataContext();

  const [selectedLanguage, setSelectedLanguage] = useState(language);
  return (
    <>
      <LanguageSelect
        buttonText="whee"
        buttonProps={{}}
        selectedLanguage={selectedLanguage}
        onLanguageSelect={setSelectedLanguage}
      />
    </>
  );
};
