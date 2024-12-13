import { useTranslation } from "react-i18next";

import HoverableComponent from "@/components/app/HoverableComponent";
import { BlueRectangleBorder } from "@/components/assets/sprites/blue/RectangleBorder";
import { BlueRectangleDepthBorder } from "@/components/assets/sprites/blue/RectangleDepthBorder";
import { GreyRectangleDepthFlat } from "@/components/assets/sprites/grey/RectangleDepthFlat";
import useGame from "@/store/useGame";

const GameEndMessage = () => {
    const { t } = useTranslation("game");
    const { isVictory, isDefeat, seed, resetGame, restartGame, restartGameWithSeed } = useGame();

    if (!isVictory && !isDefeat) return null;

    const message = isVictory ? t("victory") : t("defeat");

    return (
        <>
            <div className="absolute inset-0 z-[18568369] bg-black/30 backdrop-blur-lg"></div>
            <GreyRectangleDepthFlat className="relative z-[18568369] mx-auto mt-[7%] md:w-3/4 lg:w-1/2">
                <div className="flex flex-col">
                    <h1 className="mb-10 select-none text-center text-4xl font-bold text-foreground">{message}</h1>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <HoverableComponent
                            onClick={ restartGame }
                            component={ <BlueRectangleBorder size={ 1.5 } /> }
                            hoverComponent={ <BlueRectangleDepthBorder size={ 1.5 } /> }
                            text={ t("restart") }
                            menuName="endGame"
                        />
                        <HoverableComponent
                            onClick={ () => restartGameWithSeed(seed) }
                            component={ <BlueRectangleBorder size={ 1.5 } /> }
                            hoverComponent={ <BlueRectangleDepthBorder size={ 1.5 } /> }
                            text={ t("restartWithSeed") }
                            menuName="endGame"
                        />
                        <HoverableComponent
                            onClick={ resetGame }
                            component={ <BlueRectangleBorder size={ 1.5 } /> }
                            hoverComponent={ <BlueRectangleDepthBorder size={ 1.5 } /> }
                            text={ t("returnToMainMenu") }
                            menuName="endGame"
                        />
                    </div>
                </div>
            </GreyRectangleDepthFlat>
        </>
    );
};

export default GameEndMessage;
