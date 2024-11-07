import { useLocalStorage } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";

import { defaultGeneralSettings } from "@/components/app/settings/defaultsSettings";
import { IUpdateSettingProps } from "@/components/app/settings/general/GeneralTab";
import SettingRow from "@/components/app/settings/SettingRow";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { changeLanguage, languageAvailable } from "@/i18n";

const LanguageSelector = ({ updateGeneralSetting }: IUpdateSettingProps) => {
    const { t } = useTranslation("settingsMenu", { keyPrefix: "general" });
    const [ settings ] = useLocalStorage("settings", { general: defaultGeneralSettings });

    const handleUpdateLanguage = (value: string) => {
        updateGeneralSetting({ key: "language", value });
        changeLanguage(value);
    };

    return (
        <>
            <SettingRow label={t("language")} description={t("languageDescription")}>
                <Select value={settings.general.language} onValueChange={value => handleUpdateLanguage(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {languageAvailable.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </SettingRow>
        </>
    );
};

export default LanguageSelector;
