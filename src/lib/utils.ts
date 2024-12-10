import { type ClassValue, clsx } from "clsx";
import { RefObject } from "react";
import { twMerge } from "tailwind-merge";
import { Camera, Object3D, Vector3 } from "three";

import { IAspectRatio, ISettings } from "@/components/app/settings/defaultsSettings";
import { validateSettings } from "@/components/app/settings/import/validators/settingsValidator";
import { IBaseControllerIconProps } from "@/components/assets/icons/icon-interface";

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
        audio: { ...defaultSettings.audio, ...newSettings.audio },
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

const SEED_LENGTH = 8;

export const generateRandomSeed = () => {
    const randomValues = crypto.getRandomValues(new Uint8Array(SEED_LENGTH));
    return Array.from(randomValues, byte => byte.toString(16).padStart(2, "0")).join("");
};

export const isValidSeed = (seed: string) => {
    const hexRegex = new RegExp(`^[0-9a-fA-F]{${ SEED_LENGTH * 2 }}$`);
    return hexRegex.test(seed);
};

export const isInInteractionRangeAndFacing = (
    camera: Camera | null,
    targetRef: RefObject<Object3D>,
    maxDistance: number = 2,
    facingThreshold: number = 0.1,
) => {
    if (!camera || !targetRef.current) return false;

    const cameraPosition = camera.getWorldPosition(new Vector3());
    const targetPosition = targetRef.current.getWorldPosition(new Vector3());

    const distanceToTarget = cameraPosition.distanceTo(targetPosition);
    if (distanceToTarget > maxDistance) return false;

    const cameraDirection = camera.getWorldDirection(new Vector3());
    const directionToTarget = targetPosition.sub(cameraPosition).normalize();

    return cameraDirection.dot(directionToTarget) > facingThreshold;
};

export const mapCodeToIcon = (code: string, controllerType: string) => {
    const parts = code.split(/(?=[A-Z])/);
    const lowerCode = code.toLowerCase();

    const getIconProps = (type: string, position: string, side: string) =>
        ({
            type,
            position: position.toLowerCase() as IBaseControllerIconProps["position"],
            controllerType,
            side: side.toLowerCase() as IBaseControllerIconProps["side"],
        }) as IBaseControllerIconProps;

    if (lowerCode.includes("analog")) {
        const [ side, , position ] = parts;
        return getIconProps("analog", position, side);
    }

    if (lowerCode.includes("button")) {
        const [ side, , position ] = parts;
        return getIconProps("button", position, side);
    }

    return null;
};

export const calculateVolume = (masterVolume: number, specificVolume: number): number => {
    return Math.max(0, Math.min(1, masterVolume * specificVolume));
};

const cachedVolumes = new Map<string, { lastVolume: number | null; lastMaster: number | null; lastSpecific: number | null }>();

export const playSound = (path: string, type: "ui" | "action") => {
    if (!path) return;

    const settings = getLocalStorage("settings") as ISettings;

    const { masterVolume, uiVolume, actionVolume } = settings.audio;

    const specificVolume = type === "ui" ? uiVolume : actionVolume;

    if (!cachedVolumes.has(type)) {
        cachedVolumes.set(type, {
            lastVolume: null,
            lastMaster: null,
            lastSpecific: null,
        });
    }

    const cache = cachedVolumes.get(type)!;

    if (cache.lastVolume === null || cache.lastMaster !== masterVolume || cache.lastSpecific !== specificVolume) {
        cache.lastVolume = calculateVolume(masterVolume, specificVolume);
        cache.lastMaster = masterVolume;
        cache.lastSpecific = specificVolume;
    }

    const audio = new Audio(path);
    audio.volume = cache.lastVolume;
    audio.play().catch(error => {
        // eslint-disable-next-line no-console
        console.error("Error playing sound:", error);
    });
};
