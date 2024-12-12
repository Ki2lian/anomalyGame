import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import { getLocalStorage } from "@/lib/utils";
import enJSON from "@/locales/en.json";
import frJSON from "@/locales/fr.json";

const savedSettings = getLocalStorage("settings") as ISettings;
const savedLanguage = savedSettings?.general?.language || defaultSettings.general.language;

export const languageAvailable = [
    {
        value: "en",
        label: "English",
    },
    {
        value: "fr",
        label: "Français",
    },
];

i18n.use(initReactI18next).init({
    resources: {
        en: { ...enJSON },
        fr: { ...frJSON },
    },
    lng: savedLanguage,
    fallbackLng: "fr",
});

export const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
};

export default i18n;
