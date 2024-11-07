import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Leva, useControls } from "leva";
import { Suspense, useEffect, useState } from "react";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import SettingsMenu from "@/components/app/SettingsMenu";
import EcctrlJoystickControls from "@/components/game/EcctrlJoystickControls";
import ElementsLoader from "@/components/game/ElementsLoader";
import Experience from "@/components/game/Experience";
import { getAspectRatio } from "@/lib/utils";
import useGame from "@/store/useGame";

const Game = () => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const { toggleSettingMenu, isSettingMenu, listenToGlobalEvents, subscribeToAction, unsubscribeFromAction } = useGame();
    const [ fov, setFov ] = useState(1);

    useEffect(() => {
        if (settings?.graphics?.fov) {
            setFov(settings.graphics.fov);
        }
    }, [ settings?.graphics?.fov ]);

    useEffect(() => {
        const handleSettingsMenu = () => {
            toggleSettingMenu();
        };

        subscribeToAction("menu", handleSettingsMenu, () => true);

        return () => unsubscribeFromAction("menu", handleSettingsMenu);
    }, [ subscribeToAction, unsubscribeFromAction, toggleSettingMenu ]);

    useEffect(() => {
        const cleanup = listenToGlobalEvents();

        return () => cleanup();
    }, [ listenToGlobalEvents ]);

    const { progress } = useProgress();

    const { pointerLock } = useControls("Camera", {
        pointerLock: { value: false },
    });

    return (
        <>
            <div className="absolute right-2.5 top-2.5 z-50">
                <Leva hideCopyButton fill collapsed />
            </div>

            <ElementsLoader />

            <EcctrlJoystickControls />

            {isSettingMenu ? (
                <SettingsMenu />
            ) : null}

            <Canvas
                shadows={settings.graphics.shadows}
                camera={{
                    fov: fov,
                    near: 0.1,
                    far: 3 + settings.graphics.renderDistance,
                    aspect: getAspectRatio(settings.graphics.aspectRatio),
                }}
                dpr={settings.graphics.resolution}
                onPointerDown={e => {
                    if (!pointerLock) return;
                    if (e.pointerType === "mouse" && progress === 100) {
                        (e.target as HTMLCanvasElement).requestPointerLock();
                    }
                }}
            >
                <Suspense fallback={null}>
                    <Experience />
                </Suspense>
            </Canvas>
        </>
    );
};

export default Game;
