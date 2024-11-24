import { Environment } from "@react-three/drei";
import { useLocalStorage } from "@uidotdev/usehooks";
import Rand from "rand-seed";
import { ComponentType, useMemo } from "react";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import { Amy } from "@/models/entities/Amy";
import { Michelle } from "@/models/entities/Michelle";
import { Prof } from "@/models/entities/Prof";
import { Simon } from "@/models/entities/Simon";
import { allProps, easyProps, hardProps, IAnomalyConfig, mediumProps } from "@/models/props";
import { Elevator } from "@/models/props/Elevator";
import useGame from "@/store/useGame";

const Level = () => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const { stage, seed, difficulty } = useGame();

    const eligibleProps = useMemo<IAnomalyConfig[]>(() => {
        switch (difficulty) {
            case "easy":
                return easyProps;
            case "medium":
                return mediumProps;
            case "hard":
                return hardProps;
            default:
                return [];
        }
    }, [ difficulty ]);

    const anomalies = useMemo<IAnomalyConfig[]>(() => {
        if (stage.visitCount >= stage.maxAnomalies) return [];

        const rng = new Rand(`${ seed }-${ stage.currentStage }-${ stage.visitCount }-${ difficulty }`);
        const selectedAnomalies = new Set<IAnomalyConfig>();

        const randomIndex = Math.floor(rng.next() * eligibleProps.length);
        selectedAnomalies.add(eligibleProps[randomIndex]);

        return Array.from(selectedAnomalies);
    }, [ seed, stage.currentStage, stage.visitCount, difficulty, eligibleProps, stage.maxAnomalies ]);

    const propsToRender = useMemo<ComponentType[]>(
        () => {
            const anomalyComponents = new Set(anomalies.map(anomaly => anomaly.component));

            return allProps.filter(prop => !anomalyComponents.has(prop));
        },
        [ anomalies ],
    );

    return (
        <>
            <Environment files={`/textures/autumn_field_${ settings.graphics.environmentTexture }.hdr`} background environmentIntensity={0.3} />
            <Elevator />
            <Prof />
            <Amy />
            <Simon />
            <Michelle />
            {propsToRender.map((PropComponent, index) => (
                <PropComponent key={index} />
            ))}
            {anomalies.map(({ component: AnomalyComponent, anomalyType }, index) => (
                <AnomalyComponent key={`anomaly-${ index }`} isAnomaly anomalyType={ anomalyType } />
            ))}
        </>
    );
};

export default Level;
