import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useLocalStorage } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";
import { Leva, useControls } from "leva";
import { Suspense, useEffect } from "react";

import MainMenu from "@/components/app/MainMenu";
import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import SettingsMenu from "@/components/app/SettingsMenu";
import CrossHair from "@/components/game/CrossHair";
import EcctrlJoystickControls from "@/components/game/EcctrlJoystickControls";
import ElementsLoader from "@/components/game/ElementsLoader";
import Experience from "@/components/game/Experience";
import EyeBlink from "@/components/game/EyeBlink";
import GameEndMessage from "@/components/game/GameEndMessage";
import { getAspectRatio } from "@/lib/utils";
import useGame from "@/store/useGame";

const Game = () => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const {
        activeMenu,
        isRebinding,
        isVictory,
        isDefeat,
        resetGame,
        setActiveMenu,
        listenToGlobalEvents,
        subscribeToAction,
        unsubscribeFromAction,
    } = useGame();

    useEffect(() => {
        const handleMainMenu = () => {
            if (activeMenu === "main") {
                setActiveMenu("");
                return;
            }
            setActiveMenu("main");
        };

        const handleEscape = () => {
            if (document.pointerLockElement) {
                document.exitPointerLock();
            } else {
                handleMainMenu();
            }
        };

        const handlePointerLockChange = () => {
            if (!document.pointerLockElement && !isVictory && !isDefeat) {
                if (activeMenu !== "settings") {
                    setActiveMenu("main");
                }
            }
        };

        document.addEventListener("pointerlockchange", handlePointerLockChange);
        subscribeToAction("menu", handleEscape, () => true);

        return () => {
            unsubscribeFromAction("menu", handleEscape);
            document.removeEventListener("pointerlockchange", handlePointerLockChange);
        };
    }, [ subscribeToAction, unsubscribeFromAction, isVictory, isDefeat, activeMenu, setActiveMenu ]);

    useEffect(() => {
        if (isRebinding) return;
        const cleanup = listenToGlobalEvents();

        return () => cleanup();
    }, [ listenToGlobalEvents, isRebinding ]);

    useEffect(() => {
        if (isVictory || isDefeat) {
            if (document.pointerLockElement) {
                document.exitPointerLock();
            }
        }
    }, [ isVictory, isDefeat ]);

    const { progress } = useProgress();

    const { pointerLock } = useControls("Camera", {
        pointerLock: { value: true },
    });

    return (
        <>
            <div id="fps-counter" className="pointer-events-none fixed left-2 top-2 z-50 hidden select-none rounded-md bg-black/70 p-2 text-sm text-lime-500"></div>

            <GameEndMessage />

            <div className="absolute right-2.5 top-2.5 z-50">
                <Leva hideCopyButton fill collapsed />
            </div>

            <ElementsLoader />

            <EcctrlJoystickControls />

            <EyeBlink />

            <AnimatePresence mode="sync">
                {activeMenu === "settings" ? (
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
                ) : activeMenu === "main" ? (
                    <motion.div
                        key="mainMenu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-10"
                    >
                        <MainMenu onPlayOrResume={ () => setActiveMenu("") } onQuit={ () => resetGame() } />
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {activeMenu !== "" || progress !== 100 ? null : <CrossHair />}

            <Canvas
                shadows={ settings.graphics.shadows }
                camera={{
                    fov: 70,
                    near: 0.1,
                    far: 100,
                    aspect: getAspectRatio(settings.graphics.aspectRatio),
                }}
                dpr={ settings.graphics.resolution }
                onPointerDown={ e => {
                    if (!pointerLock) return;
                    if (e.pointerType === "mouse" && progress === 100) {
                        (e.target as HTMLCanvasElement).requestPointerLock();
                    }
                } }
            >
                <Suspense fallback={ null }>
                    <Experience />
                </Suspense>
            </Canvas>
        </>
    );
};

export default Game;
