import { useState } from "react";
import { LanguageSelect } from "@src/GraphManager/LanguageSelect";
import { useUserDataContext } from "@src/Context/UserDataContext";
import { languageDict } from "./languageDict";
import { Text } from "@src/GraphManager/RPCHooks/types";
import { TextField } from "@mui/material";
import { Formik, FormikValues } from "formik";

interface TranslatedTextInput{
  onChange: (newValue: string) => void;
  inputText: Text;
  displayValue: string;
  onSubmit?: () => void; // if used as standalone, not within a form
  isSubmitting?: boolean;
  isEnabled?: boolean;
  selectedLanguage: string;
  onLanguageSelect: (arg0: string) => void
}

interface StandaloneInput {
  text: Text
  onSubmit: (arg0: Text) => void
}

interface FormikInput {
  formik: ReturnType<typeof Formik<T>>
  fieldName: keyof T;
  
}

const getTranslation = (text: Text, language: string): string => {
  return text.translations.find(({language: itemLanguage}) => language=== itemLanguage)?.content ?? ''
}

export const TranslatedTextStandalone = ({onSubmit, text}: StandaloneInput) => {
  const { language: UILanguage } = useUserDataContext();

  const [selectedLanguage, setSelectedLanguage] = useState(UILanguage);
  const [displayedText, setDisplayedText] = useState(getTranslation(text, UILanguage))

  const handleLanguageChange = (languageString: string) => {
    setSelectedLanguage(languageString)
    setDisplayedText(getTranslation(text, languageString))
  }

  return (<TranslatedText
    inputText={text}
    displayValue={displayedText}
    onChange={setDisplayedText} 
    selectedLanguage={selectedLanguage}
    onLanguageSelect={handleLanguageChange}
  />)

}

// const TranslatedTextFormik = ({ formik, fieldName, }: FormikInput) => {
//   const { language: UILanguage } = useUserDataContext();

//   const [selectedLanguage, setSelectedLanguage] = useState(UILanguage);


//   const fieldValue = formik.values[fieldName]
//   const displayValue = fieldValue.translations.find(({language}) => language === UILanguage)?.content ?? ''


//   return (
//     <TranslatedText
//     displayValue={displayValue}
//     inputText={fieldValue}
//     selectedLanguage={selectedLanguage}
//     setSelectedLanguage={setSelectedLanguage}

//     />
//   )
// }

export const TranslatedText = ({
  inputText,
  displayValue,
  onChange,
  onSubmit,
  isSubmitting,
  isEnabled,
  selectedLanguage,
  onLanguageSelect,

}: TranslatedTextInput) => {
  const placeholderText = `🇺🇸 ${getTranslation(inputText, 'en')}`


  const languageTextMap = new Map();
  inputText.translations.forEach(({ language, content }) =>
    {
      languageTextMap.set(language, content)
    }
  );

  const hasInputChanged = displayValue !== inputText.translations[selectedLanguage]

  const handleLanguageChange = (languageString: string) => {
    if (hasInputChanged){
      // prompt confirm to drop changes, only then change
    }
    onLanguageSelect(languageString)
  } 

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value) 


  return (
    <>
      <LanguageSelect
        buttonText={languageDict[selectedLanguage].displayIcon}
        buttonProps={{ variant: "outlined" }}
        selectedLanguage={selectedLanguage}
        onLanguageSelect={handleLanguageChange}
        languageTextMap={languageTextMap}
      />
      <TextField
        fullWidth
        value={displayValue}
        onChange={handleTextChange}
        placeholder={placeholderText}
      />
    </>
  );
};
