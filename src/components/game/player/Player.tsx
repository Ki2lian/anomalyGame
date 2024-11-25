import { KeyboardControls as KeyboardMouseControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import { useLocalStorage } from "@uidotdev/usehooks";
import Ecctrl from "ecctrl";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import CharacterModel from "@/components/game/player/CharacterModel";
import { generateKeyboardMouseMap } from "@/lib/controls";
import useGame from "@/store/useGame";


interface IPlayer {
    width: number;
    height: number;
}

const Player = ({ width, height }: IPlayer) => {
    const { stage, gameIsReady, setGameIsReady } = useGame();

    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);
    const keyboardMouseMap = generateKeyboardMouseMap(settings.controls.keybindings);

    const fallThreshold = -5;

    const ecctrlRef = useRef<RapierRigidBody>(null);
    const camForceDirRef = useRef<{x: number, y: number} | null>(null);

    const SPAWN_POSITION = useMemo(() => new Vector3(-22.5, 2, -8), []);

    const vector = useMemo(() => new Vector3(), []);

    let lastCheck = 0;

    useFrame((_, delta) => {
        lastCheck += delta;
        if (lastCheck < 0.1) return;
        lastCheck = 0;

        if (ecctrlRef.current) {
            const player = ecctrlRef.current;
            const position = player.translation();

            if (position.y < fallThreshold) {
                player.setTranslation(vector.set(position.x, 2, position.z), true);
            }
        }
    });

    useEffect(() => {
        if (ecctrlRef.current) {
            const player = ecctrlRef.current;

            camForceDirRef.current = { x: 0, y: 0 };
            setTimeout(() => {
                player.setTranslation(SPAWN_POSITION, true);
                camForceDirRef.current = null;
                if (!gameIsReady) setGameIsReady(true);
            }, 1);
        }
    }, [ stage, SPAWN_POSITION, gameIsReady, setGameIsReady ]);

    return (
        <KeyboardMouseControls map={keyboardMouseMap}>
            <Ecctrl
                animated
                ref={ecctrlRef}
                position={SPAWN_POSITION}
                autoBalance={false}
                floatHeight={0}
                jumpVel={2.5}
                camInitDir={{ x: 0, y: 0 }}
                camForceDir={camForceDirRef.current}
                camInitDis={-0.001}
                camMinDis={-0.001}
                camMaxDis={-0.001}
                camInvertX={settings.controls.camInvertX ? -1 : 1}
                camInvertY={settings.controls.camInvertY ? -1 : 1}
                leftJoystickDeadZoneThreshold={settings.controls.leftJoystickDeadZone}
                rightJoystickDeadZoneThreshold={settings.controls.rightJoystickDeadZone}
                camFollowMult={100}
                turnVelMultiplier={1}
                turnSpeed={100}
                capsuleRadius={width}
                capsuleHalfHeight={height / 2}
                mode="CameraBasedMovement"
            >
                <CharacterModel args={[ width, height ]} />
                <mesh />
            </Ecctrl>
        </KeyboardMouseControls>
    );
};

export default Player;
