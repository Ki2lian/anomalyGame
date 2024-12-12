import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import AudioGroup from "@/components/game/audio/AudioGroup";
import Player from "@/components/game/player/Player";
import Camera from "@/components/game/systems/Camera";
import Level from "@/components/game/systems/Level";
import Lights from "@/components/game/systems/Lights";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import useGame from "@/store/useGame";

const Experience = () => {
    const { activeMenu, isVictory, isDefeat } = useGame();

    /**
     * Leva controls
     */

    const { debug } = useControls("World settings", {
        debug: { value: false, label: "Show/hide colliders" },
    });

    const orbitControlsRef = useRef<OrbitControlsImpl>(null);

    const { orbitControls } = useControls("Camera", {
        orbitControls: { value: false },
    });

    useEffect(() => {
        if (orbitControls && orbitControlsRef.current) {
            orbitControlsRef.current.reset();
        }
    }, [ orbitControls ]);

    /**
     * Delay physics activate
     */

    const [ pausedPhysics, setPausedPhysics ] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPausedPhysics(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <PerformanceMonitor />

            <Lights />

            <Camera />

            <AudioGroup />

            <Physics debug={ debug } paused={ pausedPhysics || activeMenu === "main" || isVictory || isDefeat } timeStep={ "vary" }>
                <OrbitControls ref={ orbitControlsRef } enabled={ orbitControls } />
                {!orbitControls ? <Player width={ 0.3 } height={ 1 } /> : <></>}

                <Level />
            </Physics>

            <axesHelper args={ [ 50 ] } />
        </>
    );
};

export default Experience;
