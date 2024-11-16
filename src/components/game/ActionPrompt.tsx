import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { IKeybindings } from "@/components/app/settings/defaultsSettings";
import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import BaseControllerIcon from "@/components/assets/icons/BaseControllerIcon";
import { cn, mapCodeToIcon } from "@/lib/utils";
import useGame from "@/store/useGame";

interface IActionPromptProps {
    actionKey: keyof IKeybindings;
    description: string;
    validateInteraction: () => boolean;
    onAction: () => void;
}

const ActionPrompt = ({ actionKey, description, validateInteraction, onAction }: IActionPromptProps) => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);

    const { isGamepadActive, isMainMenu, subscribeToAction, unsubscribeFromAction } = useGame();

    const { t } = useTranslation("settingsMenu", { keyPrefix: "controls" });

    const [ isVisible, setIsVisible ] = useState(false);

    const keyBind = useMemo(() => {
        if (isGamepadActive) {
            const controllerCode = settings.controls.keybindings[actionKey].controller.code || "";
            const iconProps = mapCodeToIcon(controllerCode, settings.controls.controllerType);
            if (iconProps) {
                return <BaseControllerIcon {...iconProps} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />;
            }
        }

        const keyboardDisplay = settings.controls.keybindings[actionKey].keyboard.display;
        const mouseDisplay = settings.controls.keybindings[actionKey].mouse.display;

        if (keyboardDisplay && mouseDisplay) {
            return `${ keyboardDisplay.toUpperCase() } / ${ t(mouseDisplay).toUpperCase() }`;
        }

        if (keyboardDisplay) return keyboardDisplay.toUpperCase();
        if (mouseDisplay) return t(mouseDisplay).toUpperCase();

        return t("notAssigned");
    }, [ actionKey, isGamepadActive, settings.controls.keybindings, settings.controls.controllerType, t ]);

    useFrame(() => {
        const visible = validateInteraction();
        setIsVisible(prevVisible => (prevVisible !== visible ? visible : prevVisible));
    });

    useEffect(() => {
        subscribeToAction(actionKey, onAction, validateInteraction);

        return () => unsubscribeFromAction(actionKey, onAction);
    }, [ actionKey, onAction, validateInteraction, subscribeToAction, unsubscribeFromAction ]);

    if (!isVisible || isMainMenu) return null;

    return (
        <Html position={[ 0, 1.5, 0 ]} className="pointer-events-none select-none">
            <div className="flex items-center text-nowrap rounded-lg bg-black/80 px-4 py-2 text-white shadow-md">
                <div
                    className={cn(
                        "mr-3 flex items-center justify-center rounded-md bg-white font-bold text-black relative",
                        typeof keyBind === "string" && keyBind.length === 1 ? "size-10" : "p-2",
                    )}
                >
                    {keyBind}
                </div>
                <span className="text-lg">{description}</span>
            </div>
        </Html>
    );
};

export default ActionPrompt;
