import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import Camera from "@/components/game/Camera";
import Level from "@/components/game/Level";
import Lights from "@/components/game/Lights";
import Player from "@/components/game/player/Player";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import useGame from "@/store/useGame";

const Experience = () => {
    const { isMainMenu, isVictory, isDefeat } = useGame();

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

            <Physics debug={debug} paused={pausedPhysics || isMainMenu || isVictory || isDefeat} timeStep={"vary"}>
                <OrbitControls ref={orbitControlsRef} enabled={orbitControls} />
                {!orbitControls ? <Player width={0.3} height={1} /> : <></>}

                <Level />
            </Physics>

            <axesHelper args={[ 50 ]} />
        </>
    );
};

export default Experience;
