import { ISettings } from "@/components/app/settings/defaultsSettings";
import { validateAudio } from "@/components/app/settings/import/validators/audio";
import { validateControls } from "@/components/app/settings/import/validators/controls";
import { validateGeneral } from "@/components/app/settings/import/validators/general";
import { validateGraphics } from "@/components/app/settings/import/validators/graphics";

export const validateSettings = (importedData: Partial<ISettings>) => {
    const validatedData: {
        general?: Partial<ISettings["general"]>;
        controls?: Partial<ISettings["controls"]>;
        graphics?: Partial<ISettings["graphics"]>;
        audio?: Partial<ISettings["audio"]>;
    } = {};

    if (importedData.general) {
        const general = validateGeneral(importedData.general);
        if (Object.keys(general).length > 0) {
            validatedData.general = general;
        }
    }

    if (importedData.controls) {
        const controls = validateControls(importedData.controls);
        if (Object.keys(controls).length > 0) {
            validatedData.controls = controls;
        }
    }

    if (importedData.graphics) {
        const graphics = validateGraphics(importedData.graphics);
        if (Object.keys(graphics).length > 0) {
            validatedData.graphics = graphics;
        }
    }

    if (importedData.audio) {
        const audio = validateAudio(importedData.audio);
        if (Object.keys(audio).length > 0) {
            validatedData.audio = audio;
        }
    }

    return validatedData as Partial<ISettings>;
};
