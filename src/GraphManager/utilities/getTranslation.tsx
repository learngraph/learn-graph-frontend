import { Text } from "../hooks/types";

export const getTranslation = ({
  translatedField,
  language,
}: {
  translatedField: Text;
  language: string;
}): string =>
  translatedField.translations.find((entry) => entry.language === language)
    ?.content || "";
