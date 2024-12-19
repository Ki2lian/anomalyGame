import { useProgress } from "@react-three/drei";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { Download } from "@/components/assets/icons/Download";
import useGame from "@/store/useGame";

const ElementsLoader = () => {
    const { progress, item, loaded, total } = useProgress();

    const { t } = useTranslation("credits", { keyPrefix: "sections.tips" });
    const tips = t("tips", { returnObjects: true }) as string[];

    const { gameIsReady } = useGame();

    const [ isVisible, setIsVisible ] = useState(true);
    const randomTipRef = useRef<string>(tips[Math.floor(Math.random() * tips.length)]);

    useEffect(() => {
        if (progress === 100 && gameIsReady) {
            setTimeout(() => setIsVisible(false), 500);
        }
    }, [ progress, gameIsReady ]);

    if (!isVisible) return null;

    return (
        <div
            className={ `fixed inset-0 z-[18568369] flex select-none items-center justify-center bg-black transition-opacity duration-500 ${
                progress === 100 && gameIsReady ? "opacity-0" : "opacity-100"
            }` }
        >
            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('images/home_background.jpg')" }}></div>
            <div className="z-[19568369] flex w-full flex-col items-center justify-center">
                <h1 className="mb-5 select-none text-3xl font-bold text-white md:text-5xl">AnomalyGame</h1>
                <div className="relative h-12 w-3/4 overflow-hidden rounded-sm bg-[#101929] lg:w-1/4">
                    <div className="absolute left-0 top-0 h-full bg-[#3FFF8C]" style={{ width: `${ progress }%` }}></div>
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-x-1 text-lg text-white">
                        <Download />
                        {Math.round(progress)}%
                    </div>
                </div>
                <div className="mt-2 flex w-3/4 flex-col space-y-4 text-white lg:w-1/4">
                    <div className="flex items-center justify-around text-sm">
                        <span>{item}</span>
                        <span>
                            {loaded}/{total}
                        </span>
                    </div>
                    <div className="flex justify-center">
                        {randomTipRef.current}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ElementsLoader);
