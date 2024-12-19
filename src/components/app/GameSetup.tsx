import { Undo2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import HoverableComponent from "@/components/app/HoverableComponent";
import { BlueRectangleBorder } from "@/components/assets/sprites/blue/RectangleBorder";
import { BlueRectangleDepthBorder } from "@/components/assets/sprites/blue/RectangleDepthBorder";
import { GreenRectangleDepthFlat } from "@/components/assets/sprites/green/RectangleDepthFlat";
import { GreenRectangleFlat } from "@/components/assets/sprites/green/RectangleFlat";
import { GreyRectangleDepthFlat } from "@/components/assets/sprites/grey/RectangleDepthFlat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { isValidSeed, playSound } from "@/lib/utils";
import useGame, { TDifficulty } from "@/store/useGame";

const GameSetup = () => {
    const { activeMenu, seed, isTransitioning, startGame, setActiveMenu } = useGame();
    const { t } = useTranslation("gameSetup");

    const [ difficulty, setDifficulty ] = useState<TDifficulty>("easy");
    const [ providedSeed, setSeed ] = useState(seed);

    const handleClick = () => {
        setActiveMenu("main");
        playSound("/audio/click.wav", "ui");
    };

    const handleStartGame = () => {
        if (activeMenu !== "gameSetup") return;
        if (providedSeed && !isValidSeed(providedSeed)) {
            toast.error(t("invalidSeed"));
            setSeed("");
            return;
        }
        startGame(difficulty, isValidSeed(providedSeed) ? providedSeed : undefined);
    };

    return (
        <GreyRectangleDepthFlat className="relative mx-auto mt-[7%] md:w-3/4 lg:w-1/2">
            <div className="flex flex-col">
                <div className="relative mb-3 flex items-center">
                    <Button className="absolute left-0" variant="secondary" onClick={ handleClick } disabled={ isTransitioning }>
                        <Undo2 />
                    </Button>
                    <h1 className="w-full select-none text-center text-xl font-bold text-foreground lg:text-3xl">{t("title")}</h1>
                </div>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex w-full cursor-pointer flex-col items-center justify-between p-2 hover:bg-secondary lg:flex-row">
                            <p className="mb-1 select-none uppercase md:mb-0">{t("difficulty")}</p>
                            <div className="flex w-full select-none flex-col items-center justify-end gap-2 lg:w-2/3 lg:flex-row">
                                <HoverableComponent
                                    onClick={ () => setDifficulty("easy") }
                                    isActive={ difficulty === "easy" }
                                    component={ <BlueRectangleBorder size={ 0.6 } /> }
                                    hoverComponent={ <BlueRectangleDepthBorder size={ 0.6 } /> }
                                    text={ t("easy") }
                                    menuName="gameSetup"
                                />
                                <HoverableComponent
                                    onClick={ () => setDifficulty("medium") }
                                    isActive={ difficulty === "medium" }
                                    component={ <BlueRectangleBorder size={ 0.6 } /> }
                                    hoverComponent={ <BlueRectangleDepthBorder size={ 0.6 } /> }
                                    text={ t("medium") }
                                    menuName="gameSetup"
                                />
                                <HoverableComponent
                                    onClick={ () => setDifficulty("hard") }
                                    isActive={ difficulty === "hard" }
                                    component={ <BlueRectangleBorder size={ 0.6 } /> }
                                    hoverComponent={ <BlueRectangleDepthBorder size={ 0.6 } /> }
                                    text={ t("hard") }
                                    menuName="gameSetup"
                                />
                            </div>
                        </div>
                        <div className="my-5 flex w-full cursor-pointer flex-col items-center justify-between p-2 hover:bg-secondary lg:flex-row">
                            <p className="mb-1 select-none uppercase md:mb-0">{t("seed")}</p>
                            <div className="flex w-full select-none items-center justify-center gap-2 lg:w-2/5">
                                <Input value={ providedSeed } onChange={ e => setSeed(e.target.value) } placeholder={ t("placeholderSeed") } />
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <HoverableComponent
                                onClick={ handleStartGame }
                                component={ <GreenRectangleFlat size={ 1 } /> }
                                hoverComponent={ <GreenRectangleDepthFlat size={ 1 } /> }
                                text={ t("start") }
                                menuName="gameSetup"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </GreyRectangleDepthFlat>
    );
};

export default GameSetup;
