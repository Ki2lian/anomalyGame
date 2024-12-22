import { useEffect, useState } from "react";

type TFullScreenHookReturn = [boolean, () => Promise<void>];

export const useFullScreen = (): TFullScreenHookReturn => {
    const [ isFullScreen, setIsFullScreen ] = useState(false);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullScreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullScreenChange);
        };
    }, []);

    const toggleFullScreen = async (): Promise<void> => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("Error attempting to toggle full-screen mode:", err);
        }
    };

    return [ isFullScreen, toggleFullScreen ];
};