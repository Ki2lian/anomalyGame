import { useLocalStorage } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";

import { defaultGeneralSettings, defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import LanguageSelector from "@/components/app/settings/general/LanguageSelector";
import ThemeSelector from "@/components/app/settings/general/ThemeSelector";
import ResetButton from "@/components/app/settings/ResetButton";
import SettingRow from "@/components/app/settings/SettingRow";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { changeLanguage } from "@/i18n";

interface IUpdateGeneralSettingProps {
    key: string;
    value: string | boolean;
}

export interface IUpdateSettingProps {
    updateGeneralSetting: ({ key, value }: IUpdateGeneralSettingProps) => void;
}

const GeneralTab = () => {
    const { t } = useTranslation("settingsMenu", { keyPrefix: "general" });
    const [ settings, setSettings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const updateGeneralSetting = ({ key, value }: IUpdateGeneralSettingProps) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            general: {
                ...prevSettings.general,
                [key]: value,
            },
        }));
    };

    return (
        <Card>
            <CardContent className="p-4">
                <ResetButton
                    section="general"
                    confirmTextKey="confirmResetDefaultGeneral"
                    successMessageKey="resetGeneralSuccessMessage"
                    onReset={ () => changeLanguage(defaultGeneralSettings.language) }
                />
                <LanguageSelector updateGeneralSetting={ updateGeneralSetting } />
                <ThemeSelector updateGeneralSetting={ updateGeneralSetting } />
                <SettingRow label={ t("fpsCounter") } description={ t("fpsCounterDescription") }>
                    <Switch checked={ settings.general.fpsCounter } onCheckedChange={ value => updateGeneralSetting({ key: "fpsCounter", value }) } />
                </SettingRow>
            </CardContent>
        </Card>
    );
};

export default GeneralTab;
