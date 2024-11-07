import { useLocalStorage } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import { Button } from "@/components/ui/button";

interface IResetButtonProps {
    section: "controls" | "general" | "graphics";
    subSection?: "keybindings";
    excludeSubSections?: string[];
    confirmTextKey: string;
    successMessageKey: string;
    onReset?: () => void;
}

const ResetButton = ({ section, subSection, excludeSubSections, confirmTextKey, successMessageKey, onReset }: IResetButtonProps) => {
    const { t } = useTranslation("settingsMenu");

    const [ _, setSettings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const handleReset = () => {
        const isConfirmed = window.confirm(t(confirmTextKey));
        if (isConfirmed) {
            setSettings(prevSettings => {
                const updatedSection = { ...defaultSettings[section as keyof ISettings] };

                if (subSection) {
                    updatedSection[subSection] = defaultSettings[section as keyof ISettings][subSection];
                }

                if (excludeSubSections && Array.isArray(excludeSubSections)) {
                    for (const sub of excludeSubSections) {
                        updatedSection[sub] = prevSettings[section as keyof ISettings][sub];
                    }
                }

                return {
                    ...prevSettings,
                    [section]: updatedSection,
                };
            });
            if (onReset) onReset();
            toast.success(t(successMessageKey));
        }
    };
    return (
        <Button onClick={handleReset} variant="default" className="mb-2 uppercase">
            {t("reset")}
        </Button>
    );
};

export default ResetButton;
