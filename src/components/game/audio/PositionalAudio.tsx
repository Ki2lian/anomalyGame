import { PositionalAudio as PositionalAudioDrei } from "@react-three/drei";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Suspense, useEffect, useRef } from "react";
import { PositionalAudio as PositionalAudioImpl, Vector3 } from "three";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import { registerPositionalAudio, unregisterPositionalAudio } from "@/hooks/useGlobalVolumeAdjustement";
import { calculateVolume } from "@/lib/utils";

interface IPositionalAudioProps {
    url: string;
    maxDistance: number;
    loop: boolean;
    name: string;
    position: Vector3;
    volumeReductionPercentage?: number;
}

const PositionalAudio = ({ url, maxDistance = 0.25, loop, name, position, volumeReductionPercentage = 100 }: IPositionalAudioProps) => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const positionalAudioRef = useRef<PositionalAudioImpl>(null);

    useEffect(() => {
        registerPositionalAudio(name, { position, maxDistance, volumeReductionPercentage });

        return () => {
            unregisterPositionalAudio(name);
        };
    }, [ position, maxDistance, name, volumeReductionPercentage ]);

    useEffect(() => {
        const audio = positionalAudioRef.current;
        if (!audio) return;

        const masterVolume = settings.audio.masterVolume;
        const ambientVolume = settings.audio.ambientVolume;

        const calculatedVolume = calculateVolume(masterVolume, ambientVolume);

        audio.setVolume(calculatedVolume);

    }, [ settings.audio.masterVolume, settings.audio.ambientVolume ]);

    useEffect(() => {
        const audio = positionalAudioRef.current;
        if (!audio) return;

        if (!audio.isPlaying) {
            audio.play();
        }

        audio.setMaxDistance(maxDistance);
        audio.setDistanceModel("linear");
    }, [ maxDistance ]);

    return (
        <Suspense fallback={ null }>
            <mesh position={ position } name={ name } visible={ false }>
                <boxGeometry args={ [ 0.1, 0.1, 0.1 ] } />
                <PositionalAudioDrei ref={ positionalAudioRef } url={ url } loop={ loop } />
            </mesh>
        </Suspense>
    );
};

export default PositionalAudio;
