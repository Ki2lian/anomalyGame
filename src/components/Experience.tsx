import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Ecctrl from "ecctrl";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useEffect, useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import CharacterModel from "@/components/CharacterModel";
import Level from "@/components/Level";
import Lights from "@/components/Lights";

const Experience = () => {
    /**
     * Leva controls
     */
    const { debug } = useControls("World settings", {
        debug: { value: true, label: "Show/hide colliders" },
    });

    const { playerWidth, playerHeight, camInitDistance, camMaxDistance } = useControls("Player", {
        playerWidth: { value: 0.3, min: 0.3, max: 1, step: 0.1, label: "Width" },
        playerHeight: { value: 1, min: 0.5, max: 2, step: 0.1, label: "Height" },
        camInitDistance: { value: -2, min: -5, max: -0.001, step: 0.001, label: "Initial distance" },
        camMaxDistance: { value: -2, min: -5, max: -0.001, step: 0.001, label: "Max distance" },
    });

    const orbitControlsRef = useRef<OrbitControlsImpl>(null);

    const { orbitControls } = useControls("Camera", {
        orbitControls: { value: true },
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

    /**
   * Keyboard control preset
   */
    const keyboardMap = [
        { name: "forward", keys: [ "ArrowUp", "KeyW" ] },
        { name: "backward", keys: [ "ArrowDown", "KeyS" ] },
        { name: "leftward", keys: [ "ArrowLeft", "KeyA" ] },
        { name: "rightward", keys: [ "ArrowRight", "KeyD" ] },
        { name: "jump", keys: [ "Space" ] },
        { name: "run", keys: [ "ShiftLeft" ] },
    ];

    const player = {
        height: playerHeight,
        width: playerWidth,
    };

    return <>
        <Perf position="top-left" />

        <Lights />

        <Physics debug={debug} paused={pausedPhysics} timeStep={"vary"}>
            <OrbitControls ref={orbitControlsRef} enabled={orbitControls} />
            {!orbitControls ? (
                <KeyboardControls map={keyboardMap}>
                    <Ecctrl
                        position={[ 0, 2, 2 ]}
                        autoBalance={false}
                        floatHeight={0}
                        jumpVel={2.5}
                        camInitDir={{ x: 0, y: -Math.PI / 2 }}
                        camInitDis={camInitDistance}
                        camMinDis={-0.001}
                        camMaxDis={camMaxDistance}
                        camFollowMult={100}
                        turnVelMultiplier={1}
                        turnSpeed={100}
                        capsuleRadius={player.width}
                        capsuleHalfHeight={player.height / 2}
                        mode="CameraBasedMovement"
                    >
                        <CharacterModel args={[ player.width, player.height ]} />
                        <mesh />
                    </Ecctrl>
                </KeyboardControls>
            ) : (
                <></>
            )}
            <Level />
        </Physics>
        <axesHelper args={[ 50 ]} />
    </>;
};

export default Experience;