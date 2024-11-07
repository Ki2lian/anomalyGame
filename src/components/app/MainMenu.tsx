import { AnimatePresence, motion } from "framer-motion";
import { ComponentPropsWithoutRef, useState } from "react";
import { useTranslation } from "react-i18next";

import SettingsMenu from "@/components/app/SettingsMenu";
import { BlueRectangleBorder } from "@/components/assets/sprites/blue/RectangleBorder";
import { BlueRectangleDepthBorder } from "@/components/assets/sprites/blue/RectangleDepthBorder";
import { RedRectangleDepthFlat } from "@/components/assets/sprites/red/RectangleDepthFlat";
import { RedRectangleFlat } from "@/components/assets/sprites/red/RectangleFlat";
import useGame from "@/store/useGame";

interface IHoverableComponentProps {
    component: React.ReactNode;
    hoverComponent: React.ReactNode;
    text: string;
}

const HoverableComponent = ({ component, hoverComponent, text, ...props }: ComponentPropsWithoutRef<"div"> & IHoverableComponentProps) => {
    const [ isHovered, setIsHovered ] = useState(false);

    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {component}
            <div className={`absolute inset-0 transition-opacity duration-200 ${ isHovered ? "opacity-100" : "opacity-0" }`}>
                {hoverComponent}
            </div>
            <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-lg dark:text-background">{text}</h1>
        </div>
    );
};

const MainMenu = () => {
    const { t } = useTranslation("mainMenu");
    const { startGame, toggleSettingMenu, isSettingMenu } = useGame();

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
                ) :
                    <motion.div
                        key="mainMenu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
                    >
                        <h1 className="mb-10 text-4xl font-bold text-black">AnomalyGame</h1>

                        <div className="flex flex-col space-y-4">
                            <HoverableComponent onClick={() => startGame()} component={<BlueRectangleBorder size={1.5} />} hoverComponent={<BlueRectangleDepthBorder size={1.5} />} text={t("play")} />
                            <HoverableComponent onClick={() => toggleSettingMenu()} component={<BlueRectangleBorder size={1.5} />} hoverComponent={<BlueRectangleDepthBorder size={1.5} />} text={t("settings")} />
                            <HoverableComponent onClick={() => window.close()} component={<RedRectangleFlat size={1.5} />} hoverComponent={<RedRectangleDepthFlat size={1.5} />} text={t("exit")} />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    </>;
};

export default MainMenu;