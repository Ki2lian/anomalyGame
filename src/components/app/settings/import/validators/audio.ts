import { ISettings } from "@/components/app/settings/defaultsSettings";

export const validateAudio = (audioData: Partial<ISettings["audio"]>): Partial<ISettings["audio"]> => {
    const validatedAudio: Partial<ISettings["audio"]> = {};

    if (typeof audioData.masterVolume === "number" && audioData.masterVolume >= 0 && audioData.masterVolume <= 1) {
        validatedAudio.masterVolume = audioData.masterVolume;
    }

    if (typeof audioData.ambientVolume === "number" && audioData.ambientVolume >= 0 && audioData.ambientVolume <= 1) {
        validatedAudio.ambientVolume = audioData.ambientVolume;
    }

    if (typeof audioData.actionVolume === "number" && audioData.actionVolume >= 0 && audioData.actionVolume <= 1) {
        validatedAudio.actionVolume = audioData.actionVolume;
    }

    if (typeof audioData.uiVolume === "number" && audioData.uiVolume >= 0 && audioData.uiVolume <= 1) {
        validatedAudio.uiVolume = audioData.uiVolume;
    }

    return validatedAudio;
};
