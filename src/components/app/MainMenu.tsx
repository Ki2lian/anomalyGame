import { useTranslation } from "react-i18next";

import HoverableComponent from "@/components/app/HoverableComponent";
import { BlueRectangleBorder } from "@/components/assets/sprites/blue/RectangleBorder";
import { BlueRectangleDepthBorder } from "@/components/assets/sprites/blue/RectangleDepthBorder";
import { RedRectangleDepthFlat } from "@/components/assets/sprites/red/RectangleDepthFlat";
import { RedRectangleFlat } from "@/components/assets/sprites/red/RectangleFlat";
import useGame from "@/store/useGame";

interface IMainMenuProps {
    onPlayOrResume: () => void;
    onQuit: () => void;
}

const MainMenu = ({ onPlayOrResume, onQuit }: IMainMenuProps) => {
    const { t } = useTranslation("mainMenu");

    const { isPlaying, setActiveMenu } = useGame();

    return (
        <>
            <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-lg"></div>
            <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
                <h1 className="mb-10 select-none text-4xl font-bold text-black">AnomalyGame</h1>

                <div className="flex flex-col space-y-4">
                    <HoverableComponent
                        onClick={ onPlayOrResume }
                        component={ <BlueRectangleBorder size={ 1.5 } /> }
                        hoverComponent={ <BlueRectangleDepthBorder size={ 1.5 } /> }
                        text={ isPlaying ? t("resume") : t("play") }
                        menuName="main"
                    />
                    <HoverableComponent
                        onClick={ () => setActiveMenu("settings") }
                        component={ <BlueRectangleBorder size={ 1.5 } /> }
                        hoverComponent={ <BlueRectangleDepthBorder size={ 1.5 } /> }
                        text={ t("settings") }
                        menuName="main"
                    />
                    <HoverableComponent
                        onClick={ onQuit }
                        component={ <RedRectangleFlat size={ 1.5 } /> }
                        hoverComponent={ <RedRectangleDepthFlat size={ 1.5 } /> }
                        text={ t("exit") }
                        menuName="main"
                    />
                </div>
            </div>
        </>
    );
};

export default MainMenu;
