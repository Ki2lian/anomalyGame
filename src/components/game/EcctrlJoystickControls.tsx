import { EcctrlJoystick } from "ecctrl";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MeshBasicMaterial } from "three";

import useGame from "@/store/useGame";

const sharedLargeBaseMaterial = { material: new MeshBasicMaterial({ color: "black", transparent: true, opacity: 0.3 }) };
const sharedTopMaterial = { material: new MeshBasicMaterial({ color: "#444444", transparent: true, opacity: 0.7 }) };
const sharedSmallBaseMaterial = { material: new MeshBasicMaterial({ color: "#222222", transparent: true, opacity: 0.5 }) };

const EcctrlJoystickControls = () => {
    const { t } = useTranslation("game", { keyPrefix: "actions" });

    const notifyActionSubscribers = useGame(state => state.notifyActionSubscribers);
    const [ isTouchScreen, setIsTouchScreen ] = useState(false);

    useEffect(() => {
        const isTouchDevice = "ontouchstart" in window || (navigator.maxTouchPoints > 0 && window.matchMedia("(pointer: coarse)").matches);
        setIsTouchScreen(isTouchDevice);
    }, []);

    return (
        <>
            {isTouchScreen && (
                <>
                    <EcctrlJoystick
                        buttonNumber={ 1 }
                        joystickBaseProps={ sharedLargeBaseMaterial }
                        joystickStickProps={ sharedSmallBaseMaterial }
                        joystickHandleProps={ sharedTopMaterial }
                        buttonLargeBaseProps={ sharedLargeBaseMaterial }
                        buttonSmallBaseProps={ sharedSmallBaseMaterial }
                        buttonTop1Props={ sharedTopMaterial }
                        buttonGroup1Position={ [ 0.5, -1.3, 0.5 ] }
                        buttonText1Props={{
                            value: t("jump"),
                            fontSize: 0.35,
                            fontWeight: "bold",
                        }}
                        customButtons={ [
                            {
                                position: [ 2, 1, 0 ],
                                callback: () => notifyActionSubscribers("interact"),
                                buttonLargeBaseProps: sharedLargeBaseMaterial,
                                buttonSmallBaseProps: sharedSmallBaseMaterial,
                                buttonTopProps: sharedTopMaterial,
                                text: {
                                    value: t("interact"),
                                    fontSize: 0.35,
                                    fontWeight: "bold",
                                },
                            },
                            {
                                position: [ -2.6, -1.3, 0 ],
                                callback: () => notifyActionSubscribers("menu"),
                                buttonLargeBaseProps: sharedLargeBaseMaterial,
                                buttonSmallBaseProps: sharedSmallBaseMaterial,
                                buttonTopProps: sharedTopMaterial,
                                text: {
                                    value: "Menu",
                                    fontSize: 0.35,
                                    fontWeight: "bold",
                                },
                            },
                        ] }
                    />
                </>
            )}
        </>
    );
};

export default EcctrlJoystickControls;
