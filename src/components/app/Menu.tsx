import { AnimatePresence, motion } from "framer-motion";

import Credits from "@/components/app/Credits";
import GameSetup from "@/components/app/GameSetup";
import MainMenu from "@/components/app/MainMenu";
import SettingsMenu from "@/components/app/SettingsMenu";
import useGame from "@/store/useGame";

const Menu = () => {
    const { activeMenu, setActiveMenu } = useGame();

    return (
        <>
            <div className="relative h-screen w-screen">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: "url('images/home_background.jpg')" }}
                ></div>
                <AnimatePresence mode="wait">
                    {activeMenu === "settings" ? (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <SettingsMenu />
                        </motion.div>
                    ) : activeMenu === "credits" ? (
                        <motion.div
                            key="credits"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Credits />
                        </motion.div>
                    ) : activeMenu === "gameSetup" ? (
                        <motion.div
                            key="gameSetup"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <GameSetup onCancel={ () => setActiveMenu("main") } />
                        </motion.div>
                    ) : activeMenu === "main" ? (
                        <motion.div
                            key="mainMenu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
                        >
                            <MainMenu onPlayOrResume={ () => setActiveMenu("gameSetup") } onQuit={ () => window.close() } />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Menu;
