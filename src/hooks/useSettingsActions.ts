import { useLocalStorage } from "@uidotdev/usehooks";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import { validateSettings } from "@/components/app/settings/import/validators/settingsValidator";
import { changeLanguage } from "@/i18n";
import { mergeSettings } from "@/lib/utils";

export const useSettingsActions = () => {
    const { t } = useTranslation("settingsMenu");
    const [ settings, setSettings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const previousSettingsRef = useRef<ISettings | null>(null);

    const handleImportSettings = (importedData: Partial<ISettings>) => {
        const validatedData = validateSettings(importedData);

        setSettings(prevSettings => {
            const newSettings = mergeSettings(prevSettings, validatedData);
            changeLanguage(newSettings.general.language);
            return newSettings;
        });

        toast.success(t("importSuccessMessage"), {
            duration: 3000,
        });
    };

    const handleExportSettings = () => {
        const settingsData = JSON.stringify(settings, null, 0);

        const blob = new Blob([ settingsData ], { type: "application/json" });
        const link = document.createElement("a");
        link.download = "settings.json";
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success(t("exportSuccessMessage"), {
            duration: 3000,
        });
    };

    const handleResetSettings = () => {
        const isConfirmed = window.confirm(t("confirmResetDefaultSettings"));
        if (isConfirmed) {
            previousSettingsRef.current = settings;
            setSettings(defaultSettings);
            changeLanguage(defaultSettings.general.language);
            toast.success(t("resetSettingsSuccessMessage"), {
                action: {
                    label: t("undo"),
                    onClick: handleUndoReset,
                },
                duration: 5000,
            });
        }
    };

    const handleUndoReset = () => {
        const previousSettingsCurrent = previousSettingsRef.current;
        if (previousSettingsCurrent) {
            setSettings(previousSettingsCurrent);
            changeLanguage(previousSettingsCurrent.general.language);
            toast.success(t("undoSuccessMessage"));
            previousSettingsRef.current = null;
        }
    };

    return {
        handleImportSettings,
        handleExportSettings,
        handleResetSettings,
    };
};
