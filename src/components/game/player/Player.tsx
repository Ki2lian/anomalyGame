import { KeyboardControls as KeyboardMouseControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLocalStorage } from "@uidotdev/usehooks";
import Ecctrl, { CustomEcctrlRigidBody } from "ecctrl";
import { useEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import CharacterModel from "@/components/game/player/CharacterModel";
import { generateKeyboardMouseMap } from "@/lib/controls";
import { delay } from "@/lib/utils";
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
    const maxFallsAllowed = 2;
    const fallResetTime = 2;

    const ecctrlRef = useRef<CustomEcctrlRigidBody>(null);

    const SPAWN_POSITION = useMemo(() => new Vector3(-22.5, 2, -8), []);

    const vector3 = useMemo(() => new Vector3(), []);

    const fallCountRef = useRef(0);
    const lastFallTimeRef = useRef(0);

    let lastCheck = 0;

    useFrame((_, delta) => {
        lastCheck += delta;
        if (lastCheck < 0.1) return;
        lastCheck = 0;

        const player = ecctrlRef.current;

        if (player) {
            const position = player.translation();

            if (position.y < fallThreshold) {
                const currentTime = Date.now();
                if (currentTime - lastFallTimeRef.current < fallResetTime * 1000) {
                    fallCountRef.current += 1;
                } else {
                    fallCountRef.current = 1;
                }

                lastFallTimeRef.current = currentTime;

                if (fallCountRef.current >= maxFallsAllowed) {
                    fallCountRef.current = 0;
                    lastFallTimeRef.current = 0;
                    setTimeout(() => {
                        player.setTranslation(SPAWN_POSITION, true);
                    }, 0);
                } else {
                    player.setTranslation(vector3.set(position.x, 2, position.z), true);
                }
            }
        }
    });

    const setCameraRotationSafe = (player: CustomEcctrlRigidBody, x: number, y: number) => player.setCameraRotation && player.setCameraRotation(x, y);

    const preRotateCamera = async (player: CustomEcctrlRigidBody, rotations: number[], delayMs: number) => {
        for (const rotation of rotations) {
            setCameraRotationSafe(player, 0, rotation);
            await delay(delayMs);
        }
    };

    const initializePlayer = async (player: CustomEcctrlRigidBody) => {
        player.setTranslation(SPAWN_POSITION, true);

        setCameraRotationSafe(player, 0, 0);

        if (!gameIsReady) {
            const rotations = [ Math.PI / 2, Math.PI, -Math.PI / 2, 0 ];
            await preRotateCamera(player, rotations, 250);
            setGameIsReady(true);
        }
    };

    useEffect(() => {
        const player = ecctrlRef.current;

        if (player) {
            setTimeout(() => {
                initializePlayer(player);
            }, 1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ ecctrlRef.current, stage ]);

    return (
        <KeyboardMouseControls map={ keyboardMouseMap }>
            <Ecctrl
                animated
                ref={ ecctrlRef }
                position={ SPAWN_POSITION }
                autoBalance={ false }
                floatHeight={ 0 }
                jumpVel={ 2.5 }
                camInvertX={ settings.controls.camInvertX }
                camInvertY={ settings.controls.camInvertY }
                leftJoystickDeadZoneThreshold={ settings.controls.leftJoystickDeadZone }
                rightJoystickDeadZoneThreshold={ settings.controls.rightJoystickDeadZone }
                capsuleRadius={ width }
                capsuleHalfHeight={ height / 2 }
                camCollision={ false }
                camInitDir={{ x: 0, y: 0 }}
                camFollowMult={ 1000 }
                camLerpMult={ 1000 }
                turnVelMultiplier={ 1 }
                turnSpeed={ 100 }
                camInitDis={ -0.01 }
                camMinDis={ -0.01 }
                camMaxDis={ -0.01 }
                mode="CameraBasedMovement"
            >
                <CharacterModel args={ [ width, height ] } />
                <mesh />
            </Ecctrl>
        </KeyboardMouseControls>
    );
};

export default Player;
