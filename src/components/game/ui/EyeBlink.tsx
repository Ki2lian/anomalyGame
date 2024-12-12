import { useEffect } from "react";

import useGame from "@/store/useGame";

const EyeBlink = () => {
    const { isTransitioningEyeBlinkEffect, setIsTransitioningEyeBlinkEffect } = useGame();

    useEffect(() => {
        if (isTransitioningEyeBlinkEffect) {
            const timeout = setTimeout(() => {
                setIsTransitioningEyeBlinkEffect(false);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [ isTransitioningEyeBlinkEffect, setIsTransitioningEyeBlinkEffect ]);

    return (
        <div
            className={ `fixed inset-0 z-[9999999] bg-black transition-opacity duration-500 ${ isTransitioningEyeBlinkEffect ? "opacity-100" : "pointer-events-none opacity-0" }` }
        ></div>
    );
};

export default EyeBlink;
