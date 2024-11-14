import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import GameSetup from "@/components/app/GameSetup";
import SettingsMenu from "@/components/app/SettingsMenu";
import useGame from "@/store/useGame";

import MainMenu from "./MainMenu";

const Menu = () => {
    const { isSettingMenu } = useGame();
    const [ showGameSetup, setShowGameSetup ] = useState<boolean>(false);

    return <>
        <div className="relative h-screen w-screen">
            <div className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: "url('images/home_background.jpg')" }}>
            </div>
            <AnimatePresence mode="wait">
                {isSettingMenu ? (
                    <motion.div
                        key="settings"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <SettingsMenu />
                    </motion.div>
                ) : showGameSetup ? (
                    <motion.div
                        key="gameSetup"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <GameSetup onCancel={() => setShowGameSetup(false)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="mainMenu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
                    >
                        <MainMenu
                            onPlayOrResume={() => setShowGameSetup(true)}
                            onQuit={() => window.close()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </>;
};

export default Menu;