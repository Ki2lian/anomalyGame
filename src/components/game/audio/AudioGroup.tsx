import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Audio, AudioListener, AudioLoader, Vector3 } from "three";

import PositionalAudio from "@/components/game/audio/PositionalAudio";
import { useGlobalVolumeAdjustment } from "@/hooks/useGlobalVolumeAdjustement";

const AudioGroup = () => {
    const { camera } = useThree();

    const listenerRef = useRef(new AudioListener());
    const bgmRef = useRef<Audio | null>(null);

    useGlobalVolumeAdjustment(bgmRef.current);

    useEffect(() => {
        const listener = listenerRef.current;
        camera.add(listener);

        const audio = new Audio(listener);
        bgmRef.current = audio;

        const audioLoader = new AudioLoader();
        audioLoader.load("/audio/bgm.mp3", buffer => {
            audio.setBuffer(buffer);
            audio.setLoop(true);
            audio.play();
        });

        return () => {
            camera.remove(listener);
            audio.stop();
        };
    }, [ camera ]);

    const outdoorPositions = [
        new Vector3(-20, 1.5, 3),
        new Vector3(-18, 1.5, 3),
        new Vector3(-16, 1.5, 3),
        new Vector3(-14, 1.5, 3),
        new Vector3(-12, 1.5, 3),
        new Vector3(-10, 1.5, 3),
        new Vector3(-8, 1.5, 3),
        new Vector3(-6, 1.5, 3),
        new Vector3(-4, 1.5, 3),
        new Vector3(-2, 1.5, 3),
        new Vector3(0, 1.5, 3),
        new Vector3(2, 1.5, 3),
        new Vector3(4, 1.5, 3),
        new Vector3(6, 1.5, 3),
        new Vector3(8, 1.5, 3),
    ];

    return (
        <>
            <PositionalAudio
                name="elevator"
                url="/audio/elevator.mp3"
                position={ new Vector3(-22.5, 2, -7.8) }
                maxDistance={ 5.5 }
                loop
                volumeReductionPercentage={ 100 }
            />
            {outdoorPositions.map((position, index) => (
                <PositionalAudio
                    key={ `outdoor-${ index }` }
                    name={ `outdoor-${ index }` }
                    url="/audio/outdoor.wav"
                    position={ position }
                    maxDistance={ 2.1 }
                    loop
                    volumeReductionPercentage={ 30 }
                />
            ))}
            <PositionalAudio
                name="ticking-clock"
                url="/audio/ticking-clock.mp3"
                position={ new Vector3(1.9, 2, -2.2) }
                maxDistance={ 4 }
                loop
                volumeReductionPercentage={ 10 }
            />
        </>
    );
};

export default AudioGroup;
