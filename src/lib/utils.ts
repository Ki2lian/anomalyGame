import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { IAspectRatio, ISettings } from "@/components/app/settings/defaultsSettings";
import { validateSettings } from "@/components/app/settings/import/validators/settingsValidator";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getLocalStorage = (key: string) => {
    try {
        return JSON.parse(localStorage.getItem(key) as string);
    } catch {
        return null;
    }
};

export const mapMouseButtonCodeToIndex = (code: string) => {
    switch (code) {
        case "MouseLeft":
            return 0;
        case "MouseMiddle":
            return 1;
        case "MouseRight":
            return 2;
        case "MouseButton4":
            return 3;
        case "MouseButton5":
            return 4;
        default:
            return -1;
    }
};

export const mapGamepadButtonToCode = (index: number) => {
    switch (index) {
        case 0:
            return "RightButtonBottom";
        case 1:
            return "RightButtonRight";
        case 2:
            return "RightButtonLeft";
        case 3:
            return "RightButtonTop";
        case 9:
            return "MiddleButtonRight";
        default:
            return "";
    }
};

const cleanObjectProperties = <T extends object>(obj: T, template: T): T => {
    const result = { ...obj };

    for (const key in result) {
        if (!(key in template)) {
            delete result[key as keyof T];
        } else {
            const value = result[key as keyof T];
            const templateValue = template[key as keyof T];

            if (typeof value === "object" && value !== null && typeof templateValue === "object" && templateValue !== null) {
                result[key as keyof T] = cleanObjectProperties(value, templateValue);
            }
        }
    }

    return result;
};

export const mergeSettings = (defaultSettings: ISettings, newSettings: Partial<ISettings>): ISettings => {
    const mergedSettings = {
        general: { ...defaultSettings.general, ...newSettings.general },
        controls: { ...defaultSettings.controls, ...newSettings.controls },
        graphics: { ...defaultSettings.graphics, ...newSettings.graphics },
    };

    return mergedSettings;
};

export const prepareSettings = (defaultSettings: ISettings, settings: Partial<ISettings>): ISettings => {
    const validatedSettings = validateSettings(settings);
    const mergedSettings = mergeSettings(defaultSettings, validatedSettings);

    return cleanObjectProperties(mergedSettings, defaultSettings);
};

export const preciseRoundToStep = (value: number, step: number, precision: number) => {
    return Number((Math.round(value / step) * step).toFixed(precision));
};

export const getAspectRatio = (AR: IAspectRatio) => {
    if (AR.isNative) return window.innerWidth / window.innerHeight;
    return AR.width / AR.height;
};