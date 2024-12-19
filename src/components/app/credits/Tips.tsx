import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const Tips = () => {
    const { t } = useTranslation("credits", { keyPrefix: "sections.tips" });
    const tips = t("tips", { returnObjects: true }) as string[];

    const [ currentTipIndex, setCurrentTipIndex ] = useState(0);
    const [ isFading, setIsFading ] = useState(false);

    useEffect(() => {
        if (!tips || tips.length === 0) return;

        const changeTip = () => {
            setIsFading(true);

            setTimeout(() => {
                setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
                setIsFading(false);
            }, 500);
        };

        const interval = setInterval(changeTip, 2500);

        return () => clearInterval(interval);
    }, [ tips ]);

    return (
        <p
            className={ `text-center text-sm transition-opacity duration-500 md:text-lg lg:text-2xl ${
                isFading ? "opacity-0" : "opacity-100"
            }` }
        >
            {tips[currentTipIndex]}
        </p>
    );
};

export default Tips;