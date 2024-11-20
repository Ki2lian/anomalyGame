import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

import useGame from "@/store/useGame";


const ElementsLoader = () => {
    const { progress } = useProgress();

    const { gameIsReady } = useGame();

    const [ isVisible, setIsVisible ] = useState(true);

    useEffect(() => {
        if (progress === 100 && gameIsReady) {
            setTimeout(() => setIsVisible(false), 500);
        }
    }, [ progress, gameIsReady ]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[18568369] flex items-center justify-center bg-gray-200 transition-opacity duration-500 ${
            progress === 100 && gameIsReady ? "opacity-0" : "opacity-100"
        }`}>
            <div className="w-64">
                <div className="h-4 overflow-hidden rounded-full bg-gray-300">
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: `${ (progress) }%` }}
                    ></div>
                </div>
                <p className="mt-2 text-center text-gray-700">Chargement des éléments...</p>
            </div>
        </div>
    );
};

export default ElementsLoader;