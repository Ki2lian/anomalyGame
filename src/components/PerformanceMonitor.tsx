import { useLocalStorage } from "@uidotdev/usehooks";
import { offEvent, onEvent } from "@utsubo/events";
import { PerfHeadless } from "r3f-perf";
import { useEffect, useRef } from "react";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";

interface ILogger {
    maxMemory: number;
    gpu: number;
    mem: number;
    cpu: number;
    fps: number;
    totalTime: number;
    frameCount: number;
}

const PerformanceMonitor = () => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);
    const fpsRef = useRef<HTMLDivElement>(document.getElementById("fps-counter") as HTMLDivElement);

    useEffect(() => {
        if (!settings.general.fpsCounter) return;
        const handler = ([ log ]: [ILogger]) => {
            const currentFps = Math.round(log.fps);
            if (fpsRef.current) {
                fpsRef.current.textContent = `${ currentFps } FPS`;

                if (fpsRef.current.classList.contains("hidden")) {
                    fpsRef.current.classList.remove("hidden");
                }
            }
        };

        onEvent("log", handler);

        return () => {
            offEvent("log", handler);
        };
    }, [ settings?.general?.fpsCounter ]);

    return <PerfHeadless logsPerSecond={1} />;
};

export default PerformanceMonitor;
