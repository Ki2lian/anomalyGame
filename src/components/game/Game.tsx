import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useLocalStorage } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { Leva, useControls } from "leva";
import { Suspense, useEffect } from "react";

import MainMenu from "@/components/app/MainMenu";
import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import SettingsMenu from "@/components/app/SettingsMenu";
import EcctrlJoystickControls from "@/components/game/EcctrlJoystickControls";
import ElementsLoader from "@/components/game/ElementsLoader";
import Experience from "@/components/game/Experience";
import { getAspectRatio } from "@/lib/utils";
import useGame from "@/store/useGame";

const Game = () => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const {
        isMainMenu,
        isSettingMenu,
        resetGame,
        toggleMainMenu,
        toggleSettingMenu,
        listenToGlobalEvents,
        subscribeToAction,
        unsubscribeFromAction,
    } = useGame();

    useEffect(() => {
        const handleMainMenu = () => {
            if (isSettingMenu) {
                toggleSettingMenu();
                return;
            }
            toggleMainMenu();
        };

        subscribeToAction("menu", handleMainMenu, () => true);

        return () => unsubscribeFromAction("menu", handleMainMenu);
    }, [ isSettingMenu, subscribeToAction, unsubscribeFromAction, toggleMainMenu, toggleSettingMenu ]);

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
            <div id="fps-counter" className="pointer-events-none fixed left-2 top-2 z-50 hidden select-none rounded-md bg-black/70 p-2 text-sm text-lime-500"></div>

            <div className="absolute right-2.5 top-2.5 z-50">
                <Leva hideCopyButton fill collapsed />
            </div>

            <ElementsLoader />

            <EcctrlJoystickControls />

            <AnimatePresence mode="sync">
                {isSettingMenu ? (
                    <motion.div
                        key="settings"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-10"
                    >
                        <SettingsMenu />
                    </motion.div>
                ) : isMainMenu ? (
                    <motion.div
                        key="mainMenu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-10"
                    >
                        <MainMenu onPlayOrResume={() => toggleMainMenu()} onQuit={() => resetGame()} />
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <Canvas
                shadows={settings.graphics.shadows}
                camera={{
                    fov: 70,
                    near: 0.1,
                    far: 100,
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
