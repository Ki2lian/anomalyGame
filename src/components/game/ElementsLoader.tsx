import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

import { Download } from "@/components/assets/icons/Download";
import useGame from "@/store/useGame";

const ElementsLoader = () => {
    const { progress, item, loaded, total } = useProgress();

    const { gameIsReady } = useGame();

    const [ isVisible, setIsVisible ] = useState(true);

    useEffect(() => {
        if (progress === 100 && gameIsReady) {
            setTimeout(() => setIsVisible(false), 500);
        }
    }, [ progress, gameIsReady ]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[18568369] flex select-none items-center justify-center bg-black transition-opacity duration-500 ${
            progress === 100 && gameIsReady ? "opacity-0" : "opacity-100"
        }`}>
            <div className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: "url('images/home_background.jpg')" }}>
            </div>
            <div className="z-[19568369] flex w-full flex-col items-center justify-center">
                <h1 className="mb-5 select-none text-3xl font-bold text-white md:text-5xl">AnomalyGame</h1>
                <div className="relative h-12 w-3/4 overflow-hidden rounded-sm bg-[#101929] lg:w-1/4">
                    <div
                        className="absolute left-0 top-0 h-full bg-[#3FFF8C]"
                        style={{ width: `${ progress }%` }}
                    >
                    </div>
                    <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-x-1 text-lg text-white">
                        <Download />
                        { progress }%
                    </div>
                </div>
                <div className="mt-2 flex w-3/4 justify-around text-sm text-white lg:w-1/4">
                    <span>{item}</span>
                    <span>{loaded}/{total}</span>
                </div>
            </div>
        </div>
    );
};

export default ElementsLoader;