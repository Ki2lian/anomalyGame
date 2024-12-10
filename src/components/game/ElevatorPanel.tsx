import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Mesh, MeshStandardMaterial, Raycaster, Vector2, Vector3 } from "three";

import useGame from "@/store/useGame";

interface IElevatorPanelProps {
    closeDoors: () => void;
    doorsCanBeToggled: boolean;
}

const ElevatorPanel = ({ closeDoors, doorsCanBeToggled }: IElevatorPanelProps) => {
    const { t } = useTranslation("game", { keyPrefix: "actions" });

    const { stage, subscribeToAction, unsubscribeFromAction, checkCurrentStage, incrementVisitCount, nextStage, setVictory, setDefeat } = useGame();

    const { camera } = useThree();

    const raycaster = useRef(new Raycaster());
    const hoveredButtonRef = useRef<string | null>(null);
    const isNearElevatorRef = useRef(false);
    const buttonRefs = {
        stayHere: useRef<Mesh>(null),
        nextStage: useRef<Mesh>(null),
    };

    const [ isNearElevator, setIsNearElevator ] = useState(false);

    const targetPosition = new Vector3(-21.7, 0.94, -7);
    const tempVec3 = new Vector3();
    const tempVec2 = new Vector2(0, 0);

    const proximityThreshold = 0.5;

    let lastCheck = 0;

    useFrame((_, delta) => {
        lastCheck += delta;
        if (lastCheck < 0.1) return;
        lastCheck = 0;

        const cameraPosition = camera.getWorldPosition(tempVec3);

        const distance = cameraPosition.distanceTo(targetPosition);
        const nearElevator = distance < proximityThreshold;

        if (nearElevator !== isNearElevator) {
            isNearElevatorRef.current = nearElevator;
            setIsNearElevator(nearElevator);
        }

        if (!nearElevator) return;

        if (!buttonRefs.stayHere.current || !buttonRefs.nextStage.current) return;

        raycaster.current.setFromCamera(tempVec2, camera);

        const intersects = raycaster.current.intersectObjects([ buttonRefs.stayHere.current, buttonRefs.nextStage.current ], true);

        const intersectedName = intersects.length > 0 ? intersects[0].object.name : null;

        if (intersectedName !== hoveredButtonRef.current) {
            hoveredButtonRef.current = intersectedName;
            (buttonRefs.stayHere.current.material as MeshStandardMaterial).color.set(intersectedName === "stayHere" ? "blue" : "gray");
            (buttonRefs.nextStage.current.material as MeshStandardMaterial).color.set(intersectedName === "nextStage" ? "blue" : "gray");
        }
    });

    const validateInteractionStayHere = useCallback(() => {
        return hoveredButtonRef.current === "stayHere" && isNearElevatorRef.current && doorsCanBeToggled;
    }, [ doorsCanBeToggled ]);

    const handleInteractionStayHere = useCallback(() => {
        const { hasAnomalies } = checkCurrentStage();

        closeDoors();

        if (hasAnomalies) {
            incrementVisitCount();
        } else {
            setDefeat();
        }
    }, [ closeDoors, checkCurrentStage, incrementVisitCount, setDefeat ]);

    const validateInteractionNextStage = useCallback(() => {
        return hoveredButtonRef.current === "nextStage" && isNearElevatorRef.current && doorsCanBeToggled;
    }, [ doorsCanBeToggled ]);

    const handleInteractionNextStage = useCallback(() => {
        const { hasAnomalies } = checkCurrentStage();

        closeDoors();

        if (hasAnomalies) {
            setDefeat();
        } else if (stage.currentStage === 1) {
            setVictory();
        } else {
            nextStage();
        }
    }, [ closeDoors, checkCurrentStage, nextStage, stage.currentStage, setVictory, setDefeat ]);

    useEffect(() => {
        subscribeToAction("interact", handleInteractionStayHere, validateInteractionStayHere);
        subscribeToAction("interact", handleInteractionNextStage, validateInteractionNextStage);

        return () => {
            unsubscribeFromAction("interact", handleInteractionStayHere);
            unsubscribeFromAction("interact", handleInteractionNextStage);
        };
    }, [
        subscribeToAction,
        unsubscribeFromAction,
        validateInteractionStayHere,
        handleInteractionStayHere,
        validateInteractionNextStage,
        handleInteractionNextStage,
    ]);

    return (
        <>
            {isNearElevator && doorsCanBeToggled ? (
                <group position={ [ 0, 0.05, 0 ] } rotation={ [ -Math.PI / 2, 0, Math.PI / 2 ] } scale={ 0.1 }>
                    <mesh ref={ buttonRefs.stayHere } name="stayHere" position={ [ 0, 1, 0 ] }>
                        <boxGeometry args={ [ 3.6, 1, 0.005 ] } />
                        <meshStandardMaterial color={ "gray" } />
                        <Text
                            name="stayHere"
                            position={ [ 0, 0, 0.01 ] }
                            textAlign="center"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={ 3.6 }
                            whiteSpace="overflowWrap"
                            fontSize={ 0.4 }
                        >
                            {t("stayHere")}
                        </Text>
                    </mesh>
                    <mesh ref={ buttonRefs.nextStage } name="nextStage" position={ [ 0, -1, 0 ] }>
                        <boxGeometry args={ [ 3.6, 1, 0.005 ] } />
                        <meshStandardMaterial color={ "gray" } />
                        <Text
                            name="nextStage"
                            position={ [ 0, 0, 0.01 ] }
                            textAlign="center"
                            anchorX="center"
                            anchorY="middle"
                            maxWidth={ 3.6 }
                            whiteSpace="overflowWrap"
                            fontSize={ 0.4 }
                        >
                            {t("nextStage")}
                        </Text>
                    </mesh>
                </group>
            ) : null}
        </>
    );
};

export default ElevatorPanel;
