import { KeyboardControls as KeyboardMouseControls } from "@react-three/drei";
import { useLocalStorage } from "@uidotdev/usehooks";
import Ecctrl from "ecctrl";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import CharacterModel from "@/components/game/player/CharacterModel";
import { generateKeyboardMouseMap } from "@/lib/controls";

interface IPlayer {
    width: number;
    height: number;
}

const Player = ({ width, height }: IPlayer) => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);
    const keyboardMouseMap = generateKeyboardMouseMap(settings.controls.keybindings);

    return (
        <KeyboardMouseControls map={keyboardMouseMap}>
            <Ecctrl
                position={[ 0, 2, 2 ]}
                autoBalance={false}
                floatHeight={0}
                jumpVel={2.5}
                camInitDir={{ x: 0, y: -Math.PI / 2 }}
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
