import { useLocalStorage } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import { Button } from "@/components/ui/button";

type SectionKeys = keyof ISettings;
type SubSections<S extends SectionKeys> = keyof ISettings[S];

interface IResetButtonProps<S extends SectionKeys> {
    section: S;
    subSection?: SubSections<S>;
    excludeSubSections?: SubSections<S>[];
    confirmTextKey: string;
    successMessageKey: string;
    onReset?: () => void;
}

const ResetButton = <S extends keyof ISettings>({ section, subSection, excludeSubSections, confirmTextKey, successMessageKey, onReset }: IResetButtonProps<S>) => {
    const { t } = useTranslation("settingsMenu");

    const [ _, setSettings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const handleReset = () => {
        const isConfirmed = window.confirm(t(confirmTextKey));
        if (isConfirmed) {
            setSettings(prevSettings => {
                const updatedSection = { ...defaultSettings[section] };

                if (subSection) {
                    updatedSection[subSection] = defaultSettings[section][subSection];
                }

                if (excludeSubSections && Array.isArray(excludeSubSections)) {
                    for (const sub of excludeSubSections) {
                        updatedSection[sub] = prevSettings[section][sub];
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
        <Button onClick={ handleReset } variant="default" className="mb-2 uppercase">
            {t("reset")}
        </Button>
    );
};

export default ResetButton;
