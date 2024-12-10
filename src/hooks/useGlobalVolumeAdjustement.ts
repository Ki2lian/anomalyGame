import { useFrame, useThree } from "@react-three/fiber";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";
import { Audio, Vector3 } from "three";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import { calculateVolume } from "@/lib/utils";

const allPositionalAudios = new Map<string, { position: Vector3; maxDistance: number; volumeReductionPercentage: number }>();

export const useGlobalVolumeAdjustment = (bgmAudio: Audio | null) => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const masterVolumeRef = useRef(settings.audio.masterVolume);
    const ambientVolumeRef = useRef(settings.audio.ambientVolume);

    useEffect(() => {
        masterVolumeRef.current = settings.audio.masterVolume;
        ambientVolumeRef.current = settings.audio.ambientVolume;
    }, [ settings.audio.masterVolume, settings.audio.ambientVolume ]);

    const { camera } = useThree();
    const tempVec3 = new Vector3();

    let lastCheck = 0;

    useFrame((_, delta) => {
        lastCheck += delta;
        if (lastCheck < 0.1) return;
        lastCheck = 0;

        if (!bgmAudio) return;

        const masterVolume = masterVolumeRef.current;
        const ambientVolume = ambientVolumeRef.current;

        const camPosition = camera.getWorldPosition(tempVec3);
        let closestDistance = Infinity;
        let closestReduction = 0;
        let fadeDistance = 0;

        for (const { position, maxDistance, volumeReductionPercentage } of allPositionalAudios.values()) {
            const distance = camPosition.distanceTo(position);

            if (distance < maxDistance && distance < closestDistance) {
                closestDistance = distance;
                closestReduction = volumeReductionPercentage;
                fadeDistance = maxDistance;

                if (distance === 0) break;
            }
        }

        if (closestDistance === Infinity) {
            const calculatedVolume = calculateVolume(masterVolume, ambientVolume);
            bgmAudio.setVolume(calculatedVolume);
            return;
        }

        const normalizedDistance = closestDistance / fadeDistance;
        const rawVolume = Math.max(0, Math.pow(normalizedDistance, 3));
        const minVolume = 1 - closestReduction / 100;

        const adjustedVolume = rawVolume * (1 - minVolume) + minVolume;

        const calculatedVolume = calculateVolume(masterVolume, ambientVolume) * adjustedVolume;
        bgmAudio.setVolume(calculatedVolume);
    });
};

export const registerPositionalAudio = (id: string, data: { position: Vector3; maxDistance: number; volumeReductionPercentage: number }) => {
    allPositionalAudios.set(id, data);
};

export const unregisterPositionalAudio = (id: string) => {
    allPositionalAudios.delete(id);
};
