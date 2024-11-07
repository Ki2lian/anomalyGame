import { ISettings } from "@/components/app/settings/defaultsSettings";

export const aspectRatiosAvailable = [
    { width: 0, height: 0 },
    { width: 800, height: 600 },
    { width: 1024, height: 768 },
    { width: 1280, height: 960 },
    { width: 1280, height: 1024 },
    { width: 1440, height: 1080 },
    { width: 1656, height: 1080 },
];

export const environmentTextureAvailable = [ "1k", "2k", "4k" ];

export const validateGraphics = (graphicsData: Partial<ISettings["graphics"]>): Partial<ISettings["graphics"]> => {
    const validatedGraphics: Partial<ISettings["graphics"]> = {};

    const aspectRatio = graphicsData.aspectRatio;

    if (typeof graphicsData.fov === "number" && graphicsData.fov >= 60 && graphicsData.fov <= 150) {
        validatedGraphics.fov = Math.trunc(graphicsData.fov);
    }

    if (typeof graphicsData.resolution === "number" && graphicsData.resolution >= 0.1 && graphicsData.resolution <= 2) {
        validatedGraphics.resolution = graphicsData.resolution;
    }

    if (typeof aspectRatio === "object" && aspectRatio.width && aspectRatio.height) {
        const isAvailable = aspectRatiosAvailable.find(ar => ar.width === aspectRatio.width && ar.height === aspectRatio.height);
        if (isAvailable) {
            validatedGraphics.aspectRatio = aspectRatio;
        }
    }

    if (typeof graphicsData.renderDistance === "number" && graphicsData.renderDistance >= 1 && graphicsData.renderDistance <= 100) {
        validatedGraphics.renderDistance = Math.trunc(graphicsData.renderDistance);
    }

    if (typeof graphicsData.shadows === "boolean") {
        validatedGraphics.shadows = graphicsData.shadows;
    }

    if (typeof graphicsData.environmentTexture === "string" && environmentTextureAvailable.includes(graphicsData.environmentTexture)) {
        validatedGraphics.environmentTexture = graphicsData.environmentTexture;
    }

    return validatedGraphics;
};
