import { ISettings } from "@/components/app/settings/defaultsSettings";
import { languageAvailable } from "@/lib/i18n";

export const themeModeAvailable = [ "light", "dark", "system" ];

export const validateGeneral = (generalData: Partial<ISettings["general"]>): Partial<ISettings["general"]> => {
    const validatedGeneral: Partial<ISettings["general"]> = {};

    if (typeof generalData.language === "string" && languageAvailable.some(lang => lang.value === generalData.language)) {
        validatedGeneral.language = generalData.language;
    }

    if (typeof generalData.themeMode === "string" && themeModeAvailable.includes(generalData.themeMode)) {
        validatedGeneral.themeMode = generalData.themeMode;
    }

    if (typeof generalData.fpsCounter === "boolean") {
        validatedGeneral.fpsCounter = generalData.fpsCounter;
    }

    return validatedGeneral;
};
