import { useLocalStorage } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";

import { defaultGeneralSettings } from "@/components/app/settings/defaultsSettings";
import { IUpdateSettingProps } from "@/components/app/settings/general/GeneralTab";
import { themeModeAvailable } from "@/components/app/settings/import/validators/general";
import SettingRow from "@/components/app/settings/SettingRow";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ThemeSelector = ({ updateGeneralSetting }: IUpdateSettingProps) => {
    const { t } = useTranslation("settingsMenu", { keyPrefix: "general" });
    const [ settings ] = useLocalStorage("settings", { general: defaultGeneralSettings });

    return (
        <>
            <SettingRow label={ t("appearance") } description={ t("appearanceDescription") }>
                <Select value={ settings.general.themeMode } onValueChange={ value => updateGeneralSetting({ key: "themeMode", value }) }>
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {themeModeAvailable.map(theme => (
                            <SelectItem key={ theme } value={ theme }>
                                {t(`themeMode.${ theme }`)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </SettingRow>
        </>
    );
};

export default ThemeSelector;
