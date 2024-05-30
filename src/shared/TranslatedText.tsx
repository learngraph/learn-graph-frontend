import { useState } from "react";
import { LanguageSelect } from "@src/GraphManager/LanguageSelect";
import { useUserDataContext } from "@src/Context/UserDataContext";
import { languageDict } from "./languageDict";
import { Text } from "@src/GraphManager/RPCHooks/types";

interface TranslatedTextInput {
  onUpdate: (text: Text) => void;
  inputText: Text;
}

export const TranslatedText = ({
  onUpdate,
  inputText,
}: TranslatedTextInput) => {
  const { language } = useUserDataContext();

  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const languageTextMap = new Map();
  inputText.translations.forEach(({ language, content }) =>
    languageTextMap.set(language, content),
  );
  //TODO: remove, is just demo
  languageTextMap.set("de", "deitscher text");

  return (
    <>
      <LanguageSelect
        buttonText={languageDict[selectedLanguage].displayIcon}
        buttonProps={{ variant: "outlined" }}
        selectedLanguage={selectedLanguage}
        onLanguageSelect={setSelectedLanguage}
        languageTextMap={languageTextMap}
      />
    </>
  );
};
